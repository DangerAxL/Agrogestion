<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthRecordRequest;
use App\Http\Requests\UpdateHealthRecordRequest;
use App\Models\Animal;
use App\Models\HealthRecord;
use Inertia\Inertia;

class HealthRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', HealthRecord::class);

        $healthRecords = HealthRecord::with('animal')->paginate(15);

        return Inertia::render('livestock/HealthRecords/Index', [
            'healthRecords' => $healthRecords,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', HealthRecord::class);

        $animals = Animal::all();

        return Inertia::render('livestock/HealthRecords/Create', [
            'animals' => $animals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHealthRecordRequest $request)
    {
        HealthRecord::create($request->validated());

        return redirect()->route('health-records.index')->with('success', __('Health record created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(HealthRecord $healthRecord)
    {
        $this->authorize('view', $healthRecord);

        $healthRecord->load('animal');

        return Inertia::render('livestock/HealthRecords/Show', [
            'healthRecord' => $healthRecord,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HealthRecord $healthRecord)
    {
        $this->authorize('update', $healthRecord);

        $animals = Animal::all();

        return Inertia::render('livestock/HealthRecords/Edit', [
            'healthRecord' => $healthRecord,
            'animals' => $animals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHealthRecordRequest $request, HealthRecord $healthRecord)
    {
        $healthRecord->update($request->validated());

        return redirect()->route('health-records.index')->with('success', __('Health record updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HealthRecord $healthRecord)
    {
        $this->authorize('delete', $healthRecord);

        $healthRecord->delete();

        return redirect()->route('health-records.index')->with('success', __('Health record deleted successfully.'));
    }
}
