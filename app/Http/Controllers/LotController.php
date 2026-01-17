<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLotRequest;
use App\Http\Requests\UpdateLotRequest;
use App\Models\Lot;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Log::info('LotController index called');
        $lots = Lot::withCount('animals')->paginate(15);
        Log::info('Lots loaded successfully', ['count' => $lots->count()]);

        return Inertia::render('lots/Index', [
            'lots' => $lots,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('lots/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLotRequest $request)
    {
        Lot::create($request->validated());

        return redirect()->route('lots.index')->with('success', __('Lot created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Lot $lot)
    {
        $lot->load(['animals', 'feedings']);

        return Inertia::render('lots/Show', [
            'lot' => $lot,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lot $lot)
    {
        return Inertia::render('lots/Edit', [
            'lot' => $lot,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLotRequest $request, Lot $lot)
    {
        $lot->update($request->validated());

        return redirect()->route('lots.index')->with('success', __('Lot updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lot $lot)
    {
        $lot->delete();

        return redirect()->route('lots.index')->with('success', __('Lot deleted successfully.'));
    }
}
