<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVeterinaryTreatmentRequest;
use App\Http\Requests\UpdateVeterinaryTreatmentRequest;
use App\Models\Animal;
use App\Models\VeterinaryTreatment;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VeterinaryTreatmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            Log::info('VeterinaryTreatmentController index called');
            $veterinaryTreatments = VeterinaryTreatment::with(['animal'])->paginate(15);
            Log::info('Veterinary treatments loaded successfully', ['count' => $veterinaryTreatments->count()]);
        } catch (\Exception $e) {
            Log::error('Error loading veterinary treatments', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('veterinary-treatments/Index', [
            'veterinaryTreatments' => $veterinaryTreatments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $animals = Animal::all();

        return Inertia::render('veterinary-treatments/Create', [
            'animals' => $animals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVeterinaryTreatmentRequest $request)
    {
        VeterinaryTreatment::create($request->validated());

        return redirect()->route('veterinary-treatments.index')->with('success', __('Veterinary treatment created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(VeterinaryTreatment $veterinaryTreatment)
    {
        $veterinaryTreatment->load(['animal']);

        return Inertia::render('veterinary-treatments/Show', [
            'veterinaryTreatment' => $veterinaryTreatment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VeterinaryTreatment $veterinaryTreatment)
    {
        $animals = Animal::all();

        return Inertia::render('veterinary-treatments/Edit', [
            'veterinaryTreatment' => $veterinaryTreatment,
            'animals' => $animals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVeterinaryTreatmentRequest $request, VeterinaryTreatment $veterinaryTreatment)
    {
        $veterinaryTreatment->update($request->validated());

        return redirect()->route('veterinary-treatments.index')->with('success', __('Veterinary treatment updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VeterinaryTreatment $veterinaryTreatment)
    {
        $veterinaryTreatment->delete();

        return redirect()->route('veterinary-treatments.index')->with('success', __('Veterinary treatment deleted successfully.'));
    }
}
