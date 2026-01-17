<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWeighingRequest;
use App\Http\Requests\UpdateWeighingRequest;
use App\Models\Animal;
use App\Models\Weighing;
use Inertia\Inertia;

class WeighingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $weighings = Weighing::with('animal')->paginate(15);
        } catch (\Exception $e) {
            \Log::error('Error loading weighings', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('weighings/Index', [
            'weighings' => $weighings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $animals = Animal::all();

        return Inertia::render('weighings/Create', [
            'animals' => $animals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWeighingRequest $request)
    {
        Weighing::create($request->validated() + ['created_by' => auth()->id()]);

        return redirect()->route('weighings.index')->with('success', __('Weighing recorded successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Weighing $weighing)
    {
        $weighing->load('animal');

        return Inertia::render('weighings/Show', [
            'weighing' => $weighing,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Weighing $weighing)
    {
        $animals = Animal::all();

        return Inertia::render('weighings/Edit', [
            'weighing' => $weighing,
            'animals' => $animals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWeighingRequest $request, Weighing $weighing)
    {
        $weighing->update($request->validated());

        return redirect()->route('weighings.index')->with('success', __('Weighing updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Weighing $weighing)
    {
        $weighing->delete();

        return redirect()->route('weighings.index')->with('success', __('Weighing deleted successfully.'));
    }
}
