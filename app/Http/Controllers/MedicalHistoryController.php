<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicalHistoryRequest;
use App\Http\Requests\UpdateMedicalHistoryRequest;
use App\Models\Animal;
use App\Models\MedicalHistory;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MedicalHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            Log::info('MedicalHistoryController index called');
            $medicalHistories = MedicalHistory::with(['animal', 'veterinarian'])->paginate(15);
            Log::info('Medical histories loaded successfully', ['count' => $medicalHistories->count()]);
        } catch (\Exception $e) {
            Log::error('Error loading medical histories', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('medical-histories/Index', [
            'medicalHistories' => $medicalHistories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $animals = Animal::all();
        $veterinarians = User::role('VETERINARIO')->get();

        return Inertia::render('medical-histories/Create', [
            'animals' => $animals,
            'veterinarians' => $veterinarians,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicalHistoryRequest $request)
    {
        MedicalHistory::create($request->validated());

        return redirect()->route('medical-histories.index')->with('success', __('Medical history created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicalHistory $medicalHistory)
    {
        $medicalHistory->load(['animal', 'veterinarian']);

        return Inertia::render('medical-histories/Show', [
            'medicalHistory' => $medicalHistory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicalHistory $medicalHistory)
    {
        $animals = Animal::all();
        $veterinarians = User::role('VETERINARIO')->get();

        return Inertia::render('medical-histories/Edit', [
            'medicalHistory' => $medicalHistory,
            'animals' => $animals,
            'veterinarians' => $veterinarians,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalHistoryRequest $request, MedicalHistory $medicalHistory)
    {
        $medicalHistory->update($request->validated());

        return redirect()->route('medical-histories.index')->with('success', __('Medical history updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalHistory $medicalHistory)
    {
        $medicalHistory->delete();

        return redirect()->route('medical-histories.index')->with('success', __('Medical history deleted successfully.'));
    }
}
