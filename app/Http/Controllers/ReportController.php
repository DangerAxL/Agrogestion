<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Feeding;
use App\Models\FeedType;
use App\Models\Lot;
use App\Models\Supply;
use App\Models\Weighing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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
        $query = Animal::query(); // Optimized: Don't eager load unless needed for list

        if ($request->has('lot_id') && $request->lot_id && $request->lot_id !== 'all') {
            $query->where('lot_id', $request->lot_id);
        }

        // Get limited list for display (could be paginated, but list view usually expects all or paginated)
        // For now, keeping get() but selecting specific columns might differ pending frontend requirements.
        // Assuming current frontend expects full models.
        $animals = $query->with(['lot', 'breed'])->get();

        $lots = Lot::all();

        // Optimized Calculations: Use DB aggregation
        $animalsByLot = \Illuminate\Support\Facades\DB::table('animals')
            ->join('lots', 'animals.lot_id', '=', 'lots.id')
            ->select('lots.name', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('lots.name')
            ->pluck('total', 'name');

        $animalsByBreed = \Illuminate\Support\Facades\DB::table('animals')
            ->join('breeds', 'animals.breed_id', '=', 'breeds.id')
            ->select('breeds.name', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('breeds.name')
            ->pluck('total', 'name');

        $animalsByStatus = \Illuminate\Support\Facades\DB::table('animals')
            ->select('status', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $activeVsInactive = [
            'active' => \Illuminate\Support\Facades\DB::table('animals')->where('active', true)->count(),
            'inactive' => \Illuminate\Support\Facades\DB::table('animals')->where('active', false)->count(),
        ];

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
        $query = Weighing::with(['animal.lot']); // Eager loading is fine with pagination

        if ($request->has('animal_id') && $request->animal_id && $request->animal_id !== 'all') {
            $query->where('animal_id', $request->animal_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }

        // Optimize: Use simplePaginate to avoid loading all records
        $weighings = $query->orderBy('date', 'desc')->simplePaginate(50); // Changed to DESC for recent first

        // Animals list for filter - distinct and select only needed columns
        $animals = Animal::select('id', 'caravana')->get();

        return Inertia::render('reports/Weighings', [
            'weighings' => $weighings, // Inertia handles pagination object automatically
            'animals' => $animals,
            'filters' => $request->only(['animal_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Generate and display feeding report.
     */
    public function feedings(Request $request)
    {
        Log::info('ReportController feedings method started (Optimized)');
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

        // Use simplePaginate for the list view to prevent OOM
        $feedings = $query->orderBy('date', 'desc')->simplePaginate(50);

        $lots = Lot::select('id', 'name')->get();
        $feedTypes = FeedType::select('id', 'name')->get();

        // Optimized Weight Gain Calculation
        // Avoid loading whole history. Load min/max date weighings per animal for the specific lots involved.
        $weightGains = [];

        // 1. Identify relevant Lot IDs based on *current* filter (or all)
        // Note: Using a separate query to get ALL lot IDs involved in the filter range, not just the paginated ones.
        $lotIdsQuery = Feeding::query();
        if ($request->has('lot_id') && $request->lot_id && $request->lot_id !== 'all')
            $lotIdsQuery->where('lot_id', $request->lot_id);
        if ($request->has('date_from') && $request->date_from)
            $lotIdsQuery->where('date', '>=', $request->date_from);
        if ($request->has('date_to') && $request->date_to)
            $lotIdsQuery->where('date', '<=', $request->date_to);
        $involvedLotIds = $lotIdsQuery->distinct()->pluck('lot_id');

        // 2. Get Animals in those lots
        $involvedAnimalIds = Animal::whereIn('lot_id', $involvedLotIds)->pluck('id');

        // 3. Fetch ONLY First and Last weighings for these animals (within a reasonable range or all time if unrestricted)
        // Grouping by animal to calculate gain.
        // We need: AnimalID, MinDate, MinWeight, MaxDate, MaxWeight.
        // Since SQL 'first'/'last' by date is tricky in one go without window functions, 
        // we can fetch ID, Date, Weight ordered by date for these animals.
        // Optimization: Only fetch columns needed.
        $relevantWeighings = Weighing::select('animal_id', 'weight', 'date')
            ->whereIn('animal_id', $involvedAnimalIds)
            ->orderBy('date')
            ->get()
            ->groupBy('animal_id');

        foreach ($feedTypes as $feedType) {
            // For this FeedType, find average gain of animals in Lots that consumed it.
            // This logic is slightly flawed in original code (assumed feedtype -> lot -> animal link exclusive).
            // Keeping original logic intent: Filter lots that consumed this feedtype.

            // Get lots that obeyed this feedtype filter
            $lotsConsumingType = Feeding::where('feed_type_id', $feedType->id)
                ->when($request->date_from, fn($q) => $q->where('date', '>=', $request->date_from))
                ->when($request->date_to, fn($q) => $q->where('date', '<=', $request->date_to))
                ->distinct()
                ->pluck('lot_id');

            $gains = [];

            // Get animals in these lots
            $animalsInTypeLots = Animal::whereIn('lot_id', $lotsConsumingType)->pluck('id');

            foreach ($animalsInTypeLots as $animalId) {
                $animalWeighings = $relevantWeighings->get($animalId);
                if ($animalWeighings && $animalWeighings->count() > 1) {
                    $first = $animalWeighings->first();
                    $last = $animalWeighings->last();
                    $days = $first->date->diffInDays($last->date); // Carbon diff

                    if ($days > 0) {
                        $gain = ($last->weight - $first->weight) / $days;
                        $gains[] = $gain;
                    }
                }
            }

            $avgDaily = count($gains) > 0 ? array_sum($gains) / count($gains) : 0;

            $weightGains[$feedType->name] = [
                'daily' => $avgDaily,
                'monthly' => $avgDaily * 30,
                'semesterly' => $avgDaily * 180,
            ];
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
        $query = Supply::query();

        if ($request->has('name') && $request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', 'like', '%' . $request->category . '%');
        }

        $supplies = $query->get();



        return Inertia::render('reports/Supplies', [
            'supplies' => $supplies,
            'filters' => $request->only(['name', 'category']),
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
        // Optimize: Use withCount and withAvg instead of loading all animals
        $lots = Lot::withCount([
            'animals as total_animals',
            'animals as active_animals' => function ($query) {
                $query->where('active', true);
            },
            'animals as inactive_animals' => function ($query) {
                $query->where('active', false);
            }
        ])
            ->withAvg('animals as average_weight', 'weight_current')
            ->get();

        // Map to format expected by frontend (which expects 'lotsStats' array)
        // Since we did the heavy lifting in DB, we just remap properties.
        $lotsStats = $lots->map(function ($lot) {
            return [
                'id' => $lot->id,
                'name' => $lot->name,
                'total_animals' => $lot->total_animals,
                'active_animals' => $lot->active_animals,
                'inactive_animals' => $lot->inactive_animals,
                'average_weight' => round($lot->average_weight ?? 0, 2),
            ];
        });



        return Inertia::render('reports/Lots', [
            'lotsStats' => $lotsStats,
        ]);
    }
}
