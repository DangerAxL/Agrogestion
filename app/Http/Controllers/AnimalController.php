<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Models\Animal;
use App\Models\Breed;
use App\Models\Lot;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            Log::info('AnimalController index called');
            $animals = Animal::with(['lot', 'breed'])->paginate(15);
            Log::info('Animals loaded successfully', ['count' => $animals->count()]);
        } catch (\Exception $e) {
            Log::error('Error loading animals', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('animals/Index', [
            'animals' => $animals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lots = Lot::all();
        $breeds = Breed::all();

        return Inertia::render('animals/Create', [
            'lots' => $lots,
            'breeds' => $breeds,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnimalRequest $request)
    {
        $animal = \Illuminate\Support\Facades\DB::transaction(function () use ($request) {
            $animal = Animal::create($request->validated());

            if ($request->filled('stage_name')) {
                $animal->stages()->create([
                    'stage_name' => $request->stage_name,
                ]);
            }

            if ($request->filled('caravana_nro') && $request->filled('color')) {
                $animal->caravanas()->create([
                    'caravana_nro' => $request->caravana_nro,
                    'color' => $request->color,
                ]);
            }

            return $animal;
        });

        return redirect()->route('animals.index')->with('success', __('Animal created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal)
    {
        $animal->load(['lot', 'breed', 'weighings', 'feedings', 'stages', 'caravanas']);

        return Inertia::render('animals/Show', [
            'animal' => $animal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Animal $animal)
    {
        $animal->load(['stages', 'caravanas']);
        $lots = Lot::all();
        $breeds = Breed::all();

        return Inertia::render('animals/Edit', [
            'animal' => $animal,
            'lots' => $lots,
            'breeds' => $breeds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnimalRequest $request, Animal $animal)
    {
        \Illuminate\Support\Facades\DB::transaction(function () use ($request, $animal) {
            $animal->update($request->validated());

            if ($request->filled('stage_name')) {
                // Determine if we should create a new one or update the latest.
                // Assuming we want to track history, we create new if different?
                // Or for simplicity, let's just create a new one if provided, or update the latest?
                // Let's create a new one to keep history as commonly favored in these apps.
                // Or maybe the user just wants to correct the current one.
                // Given the prompt "modify the modules... with the correct relations", let's assume simple add.
                // But ideally we might want to update the *latest* if it exists, or create new.
                // Let's go with: Create if not exists or if checking logic (not implemented). 
                // Simplified: Update the latest one if it exists, otherwise create.

                $latestStage = $animal->stages()->latest()->first();
                if ($latestStage) {
                    $latestStage->update(['stage_name' => $request->stage_name]);
                } else {
                    $animal->stages()->create(['stage_name' => $request->stage_name]);
                }
            }

            if ($request->filled('caravana_nro') && $request->filled('color')) {
                $latestCaravana = $animal->caravanas()->latest()->first();
                if ($latestCaravana) {
                    $latestCaravana->update([
                        'caravana_nro' => $request->caravana_nro,
                        'color' => $request->color,
                    ]);
                } else {
                    $animal->caravanas()->create([
                        'caravana_nro' => $request->caravana_nro,
                        'color' => $request->color,
                    ]);
                }
            }
        });

        return redirect()->route('animals.index')->with('success', __('Animal updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal)
    {
        $animal->delete();

        return redirect()->route('animals.index')->with('success', __('Animal deleted successfully.'));
    }
}
