<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthAlertRequest;
use App\Http\Requests\UpdateHealthAlertRequest;
use App\Models\Animal;
use App\Models\HealthAlert;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HealthAlertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $healthAlerts = HealthAlert::with(['animal', 'creator'])->paginate(15);

        return Inertia::render('health-alerts/Index', [
            'healthAlerts' => $healthAlerts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $animals = Animal::all();

        return Inertia::render('health-alerts/Create', [
            'animals' => $animals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHealthAlertRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();

        if (isset($data['resolved']) && $data['resolved']) {
            $data['resolved_at'] = now();
        }

        HealthAlert::create($data);

        return redirect()->route('health-alerts.index')->with('success', __('Health alert created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(HealthAlert $healthAlert)
    {
        $healthAlert->load(['animal', 'creator']);

        return Inertia::render('health-alerts/Show', [
            'healthAlert' => $healthAlert,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HealthAlert $healthAlert)
    {
        $animals = Animal::all();

        return Inertia::render('health-alerts/Edit', [
            'healthAlert' => $healthAlert,
            'animals' => $animals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHealthAlertRequest $request, HealthAlert $healthAlert)
    {
        $data = $request->validated();

        if (isset($data['resolved'])) {
            if ($data['resolved'] && !$healthAlert->resolved) {
                $data['resolved_at'] = now();
            } elseif (!$data['resolved'] && $healthAlert->resolved) {
                $data['resolved_at'] = null;
            }
        }

        $healthAlert->update($data);

        return redirect()->route('health-alerts.index')->with('success', __('Health alert updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HealthAlert $healthAlert)
    {
        $healthAlert->delete();

        return redirect()->route('health-alerts.index')->with('success', __('Health alert deleted successfully.'));
    }
}
