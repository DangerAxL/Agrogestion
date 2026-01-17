<?php

namespace App\Http\Controllers;

use App\Exports\AnimalsExport;
use App\Exports\SuppliesExport;
use App\Models\Animal;
use App\Models\Feeding;
use App\Models\FeedType;
use App\Models\Lot;
use App\Models\Supply;
use App\Models\Weighing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * Display a listing of available reports.
     */
    public function index()
    {
        try {
            // No queries here, but for consistency
        } catch (\Exception $e) {
            Log::error('Error loading reports index', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('reports/Index');
    }

    /**
     * Generate and display animal inventory report.
     */
    public function animals(Request $request)
    {
        $query = Animal::with(['lot', 'breed']);

        if ($request->has('lot_id') && $request->lot_id && $request->lot_id !== 'all') {
            $query->where('lot_id', $request->lot_id);
        }

        $animals = $query->get();

        $lots = Lot::all();

        // Calculate statistics for charts
        $animalsByLot = $animals->groupBy('lot.name')->map->count();
        $animalsByBreed = $animals->groupBy('breed.name')->map->count();
        $animalsByStatus = $animals->groupBy('status')->map->count();
        $activeVsInactive = [
            'active' => $animals->where('active', true)->count(),
            'inactive' => $animals->where('active', false)->count(),
        ];

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new AnimalsExport($animals), 'animals_report.xlsx');
        }

        return Inertia::render('reports/Animals', [
            'animals' => $animals,
            'lots' => $lots,
            'filters' => $request->only(['lot_id']),
            'charts' => [
                'animalsByLot' => $animalsByLot,
                'animalsByBreed' => $animalsByBreed,
                'animalsByStatus' => $animalsByStatus,
                'activeVsInactive' => $activeVsInactive,
            ],
        ]);
    }

    /**
     * Generate and display weighing report.
     */
    public function weighings(Request $request)
    {
        $query = Weighing::with(['animal.lot']);

        if ($request->has('animal_id') && $request->animal_id && $request->animal_id !== 'all') {
            $query->where('animal_id', $request->animal_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        $weighings = $query->orderBy('date')->get();

        $animals = Animal::all();

        return Inertia::render('reports/Weighings', [
            'weighings' => $weighings,
            'animals' => $animals,
            'filters' => $request->only(['animal_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Generate and display feeding report.
     */
    public function feedings(Request $request)
    {
        Log::info('ReportController feedings method started');
        $query = Feeding::with(['lot', 'feedType']);

        if ($request->has('lot_id') && $request->lot_id && $request->lot_id !== 'all') {
            $query->where('lot_id', $request->lot_id);
        }

        if ($request->has('feed_type_id') && $request->feed_type_id && $request->feed_type_id !== 'all') {
            $query->where('feed_type_id', $request->feed_type_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        $feedings = $query->orderBy('date')->get();

        $lots = Lot::all();
        $feedTypes = FeedType::all();

        // Calculate weight gains with optimized queries
        $weightGains = [];

        // Get all unique lot_ids from feedings
        $allLotIds = $feedings->pluck('lot_id')->unique();

        // Eager load lots with animals
        $lotsWithAnimals = Lot::with('animals')->whereIn('id', $allLotIds)->get()->keyBy('id');

        // Get all animal_ids from those lots
        $allAnimalIds = $lotsWithAnimals->pluck('animals')->flatten()->pluck('id')->unique();

        // Eager load all weighings for those animals
        $allWeighings = Weighing::whereIn('animal_id', $allAnimalIds)->orderBy('date')->get()->groupBy('animal_id');

        foreach ($feedTypes as $feedType) {
            $feedingsForType = $feedings->where('feed_type_id', $feedType->id);
            $lotsIds = $feedingsForType->pluck('lot_id')->unique();

            $dailyGains = [];
            $monthlyGains = [];
            $semesterlyGains = [];

            foreach ($lotsIds as $lotId) {
                $lot = $lotsWithAnimals->get($lotId);
                if ($lot && $lot->animals->count() > 0) {
                    foreach ($lot->animals as $animal) {
                        $weighings = $allWeighings->get($animal->id, collect());
                        if ($weighings->count() > 1) {
                            $first = $weighings->first();
                            $last = $weighings->last();
                            $days = $first->date->diffInDays($last->date);
                            if ($days > 0) {
                                $gain = ($last->weight - $first->weight) / $days;
                                $dailyGains[] = $gain;
                                $monthlyGains[] = $gain * 30;
                                $semesterlyGains[] = $gain * 180;
                            }
                        }
                    }
                }
            }

            $weightGains[$feedType->name] = [
                'daily' => count($dailyGains) > 0 ? array_sum($dailyGains) / count($dailyGains) : 0,
                'monthly' => count($monthlyGains) > 0 ? array_sum($monthlyGains) / count($monthlyGains) : 0,
                'semesterly' => count($semesterlyGains) > 0 ? array_sum($semesterlyGains) / count($semesterlyGains) : 0,
            ];
        }

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new FeedingsExport($feedings, $weightGains), 'feedings_report.xlsx');
        }

        return Inertia::render('reports/Feedings', [
            'feedings' => $feedings,
            'lots' => $lots,
            'feedTypes' => $feedTypes,
            'filters' => $request->only(['lot_id', 'feed_type_id', 'date_from', 'date_to']),
            'weightGains' => $weightGains,
        ]);
    }

    /**
     * Generate and display supply inventory report.
     */
    public function supplies(Request $request)
    {
        $supplies = Supply::all();

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new SuppliesExport($supplies), 'supplies_report.xlsx');
        }

        return Inertia::render('reports/Supplies', [
            'supplies' => $supplies,
        ]);
    }

    /**
     * Generate and display breeds report.
     */
    public function breeds(Request $request)
    {
        $query = Animal::with(['lot', 'breed']);

        if ($request->has('stage') && $request->stage && $request->stage !== 'all') {
            $query->where('status', $request->stage);
        }

        $animals = $query->get();

        $breedsByLot = $animals->groupBy(['lot.name', 'breed.name'])->map(function ($lotGroup) {
            return $lotGroup->map->count();
        });

        $stages = Animal::distinct('status')->pluck('status');

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new BreedsExport($breedsByLot), 'breeds_report.xlsx');
        }

        return Inertia::render('reports/Breeds', [
            'breedsByLot' => $breedsByLot,
            'stages' => $stages,
            'filters' => $request->only(['stage']),
        ]);
    }

    /**
     * Generate and display lots report.
     */
    public function lots(Request $request)
    {
        $lots = Lot::with('animals')->get();

        $lotsStats = $lots->map(function ($lot) {
            return [
                'id' => $lot->id,
                'name' => $lot->name,
                'total_animals' => $lot->animals->count(),
                'active_animals' => $lot->animals->where('active', true)->count(),
                'inactive_animals' => $lot->animals->where('active', false)->count(),
                'average_weight' => $lot->animals->avg('weight_current') ?? 0,
            ];
        });

        if ($request->has('export') && $request->export === 'excel') {
            return Excel::download(new LotsExport($lotsStats), 'lots_report.xlsx');
        }

        return Inertia::render('reports/Lots', [
            'lotsStats' => $lotsStats,
        ]);
    }
}
