<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Feeding;
use App\Models\Lot;
use App\Models\Weighing;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class AnalyticsController extends Controller
{
    private function getProductionTrendsQuery(Request $request)
    {
        $query = Animal::whereNotNull('withdrawal_date')
            ->where('active', false); // Assuming withdrawn animals are inactive

        if ($request->has('date_from')) {
            $query->where('withdrawal_date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('withdrawal_date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->where('lot_id', $request->lot_id);
        }
        if ($request->has('animal_id')) {
            $query->where('id', $request->animal_id);
        }

        return $query;
    }

    public function productionTrends(Request $request)
    {
        $query = $this->getProductionTrendsQuery($request);

        $data = $query->selectRaw('YEAR(withdrawal_date) as year, MONTH(withdrawal_date) as month, SUM(weight_current) as total_weight')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $labels = $data->map(fn ($item) => Carbon::create($item->year, $item->month)->format('M Y'));
        $values = $data->pluck('total_weight');

        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Producción (kg)',
                    'data' => $values,
                ],
            ],
            'filters' => $request->only(['date_from', 'date_to', 'lot_id', 'animal_id']),
        ]);
    }

    public function animalGrowth(Request $request)
    {
        $query = Weighing::query();

        if ($request->has('date_from')) {
            $query->where('date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->whereHas('animal', fn ($q) => $q->where('lot_id', $request->lot_id));
        }
        if ($request->has('animal_id')) {
            $query->where('animal_id', $request->animal_id);
        }

        $weightData = $query->selectRaw('DATE(date) as date, AVG(weight) as avg_weight')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $gainData = $query->selectRaw('DATE(date) as date, AVG(daily_gain) as avg_gain')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'weight' => [
                'labels' => $weightData->pluck('date'),
                'datasets' => [
                    [
                        'label' => 'Peso Promedio (kg)',
                        'data' => $weightData->pluck('avg_weight'),
                    ],
                ],
            ],
            'growth_rate' => [
                'labels' => $gainData->pluck('date'),
                'datasets' => [
                    [
                        'label' => 'Tasa de Crecimiento Promedio (kg/día)',
                        'data' => $gainData->pluck('avg_gain'),
                    ],
                ],
            ],
            'filters' => $request->only(['date_from', 'date_to', 'lot_id', 'animal_id']),
        ]);
    }

    public function feedConsumption(Request $request)
    {
        $query = Feeding::query();

        if ($request->has('date_from')) {
            $query->where('date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->where('lot_id', $request->lot_id);
        }
        if ($request->has('feed_type_id')) {
            $query->where('feed_type_id', $request->feed_type_id);
        }

        $data = $query->with('feedType')
            ->selectRaw('feed_type_id, SUM(total_ration) as total_quantity')
            ->groupBy('feed_type_id')
            ->get();

        $labels = $data->map(fn ($item) => $item->feedType->name ?? 'Desconocido');
        $values = $data->pluck('total_quantity');

        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Consumo Total (kg)',
                    'data' => $values,
                ],
            ],
            'filters' => $request->only(['date_from', 'date_to', 'lot_id', 'feed_type_id']),
        ]);
    }

    public function getLots()
    {
        return Lot::select('id', 'name')->get();
    }

    public function getAnimals()
    {
        return Animal::select('id', 'caravana')->get();
    }

    public function exportProductionTrendsCsv(Request $request)
    {
        $query = Animal::whereNotNull('withdrawal_date')
            ->where('active', false);

        if ($request->has('date_from')) {
            $query->where('withdrawal_date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('withdrawal_date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->where('lot_id', $request->lot_id);
        }
        if ($request->has('animal_id')) {
            $query->where('id', $request->animal_id);
        }

        $data = $query->selectRaw('YEAR(withdrawal_date) as year, MONTH(withdrawal_date) as month, SUM(weight_current) as total_weight')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $csvData = "Año,Mes,Peso Total\n";
        foreach ($data as $item) {
            $csvData .= "{$item->year},{$item->month},{$item->total_weight}\n";
        }

        return Response::streamDownload(function () use ($csvData) {
            echo $csvData;
        }, 'production_trends.csv', ['Content-Type' => 'text/csv']);
    }

    public function exportAnimalGrowthCsv(Request $request)
    {
        $query = Weighing::query();

        if ($request->has('date_from')) {
            $query->where('date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->whereHas('animal', fn ($q) => $q->where('lot_id', $request->lot_id));
        }
        if ($request->has('animal_id')) {
            $query->where('animal_id', $request->animal_id);
        }

        $weightData = $query->selectRaw('DATE(date) as date, AVG(weight) as avg_weight')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $gainData = $query->selectRaw('DATE(date) as date, AVG(daily_gain) as avg_gain')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $csvData = "Fecha,Peso Promedio,Tasa de Crecimiento\n";
        $combined = $weightData->map(function ($w) use ($gainData) {
            $gain = $gainData->firstWhere('date', $w->date);

            return [
                'date' => $w->date,
                'avg_weight' => $w->avg_weight,
                'avg_gain' => $gain ? $gain->avg_gain : 0,
            ];
        });

        foreach ($combined as $item) {
            $csvData .= "{$item['date']},{$item['avg_weight']},{$item['avg_gain']}\n";
        }

        return Response::streamDownload(function () use ($csvData) {
            echo $csvData;
        }, 'animal_growth.csv', ['Content-Type' => 'text/csv']);
    }

    public function exportFeedConsumptionCsv(Request $request)
    {
        $query = Feeding::query();

        if ($request->has('date_from')) {
            $query->where('date', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->where('date', '<=', $request->date_to);
        }
        if ($request->has('lot_id')) {
            $query->where('lot_id', $request->lot_id);
        }
        if ($request->has('feed_type_id')) {
            $query->where('feed_type_id', $request->feed_type_id);
        }

        $data = $query->with('feedType')
            ->selectRaw('feed_type_id, SUM(total_ration) as total_quantity')
            ->groupBy('feed_type_id')
            ->get();

        $csvData = "Tipo de Alimento,Cantidad Total\n";
        foreach ($data as $item) {
            $name = $item->feedType->name ?? 'Desconocido';
            $csvData .= "{$name},{$item->total_quantity}\n";
        }

        return Response::streamDownload(function () use ($csvData) {
            echo $csvData;
        }, 'feed_consumption.csv', ['Content-Type' => 'text/csv']);
    }
}
