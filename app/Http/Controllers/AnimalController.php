<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Models\Animal;
use App\Models\Lot;
use Inertia\Inertia;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $animals = Animal::with(['lot', 'breed'])->paginate(15);

        return Inertia::render('livestock/Animals/Index', [
            'animals' => $animals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lots = Lot::all();
        $breeds = \App\Models\Breed::all();

        return Inertia::render('livestock/Animals/Create', [
            'lots' => $lots,
            'breeds' => $breeds,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnimalRequest $request)
    {
        Animal::create($request->validated());

        return redirect()->route('animals.index')->with('success', __('Animal created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal)
    {
        $animal->load(['lot', 'breed', 'weighings', 'healthRecords', 'feedings']);

        return Inertia::render('livestock/Animals/Show', [
            'animal' => $animal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Animal $animal)
    {
        $lots = Lot::all();
        $breeds = \App\Models\Breed::all();

        return Inertia::render('livestock/Animals/Edit', [
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
        $animal->update($request->validated());

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
