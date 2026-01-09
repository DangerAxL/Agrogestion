<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedingRequest;
use App\Http\Requests\UpdateFeedingRequest;
use App\Models\Animal;
use App\Models\Feeding;
use App\Models\Lot;
use Inertia\Inertia;

class FeedingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedings = Feeding::with(['animal', 'lot'])->paginate(15);

        return Inertia::render('livestock/Feedings/Index', [
            'feedings' => $feedings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $animals = Animal::all();
        $lots = Lot::all();
        $feedTypes = \App\Models\FeedType::all();

        return Inertia::render('livestock/Feedings/Create', [
            'animals' => $animals,
            'lots' => $lots,
            'feedTypes' => $feedTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedingRequest $request)
    {
        Feeding::create($request->validated());

        return redirect()->route('feedings.index')->with('success', __('Feeding record created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Feeding $feeding)
    {
        $feeding->load(['animal', 'lot']);

        return Inertia::render('livestock/Feedings/Show', [
            'feeding' => $feeding,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feeding $feeding)
    {
        $animals = Animal::all();
        $lots = Lot::all();
        $feedTypes = \App\Models\FeedType::all();

        return Inertia::render('livestock/Feedings/Edit', [
            'feeding' => $feeding,
            'animals' => $animals,
            'lots' => $lots,
            'feedTypes' => $feedTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedingRequest $request, Feeding $feeding)
    {
        $feeding->update($request->validated());

        return redirect()->route('feedings.index')->with('success', __('Feeding record updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feeding $feeding)
    {
        $feeding->delete();

        return redirect()->route('feedings.index')->with('success', __('Feeding record deleted successfully.'));
    }
}
