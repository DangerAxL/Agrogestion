<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplyRequest;
use App\Http\Requests\UpdateSupplyRequest;
use App\Models\Supply;
use Inertia\Inertia;

class SupplyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supplies = Supply::paginate(15);

        return Inertia::render('livestock/Supplies/Index', [
            'supplies' => $supplies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('livestock/Supplies/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplyRequest $request)
    {
        Supply::create($request->validated());

        return redirect()->route('supplies.index')->with('success', __('Supply created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Supply $supply)
    {
        return Inertia::render('livestock/Supplies/Show', [
            'supply' => $supply,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supply $supply)
    {
        return Inertia::render('livestock/Supplies/Edit', [
            'supply' => $supply,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplyRequest $request, Supply $supply)
    {
        $supply->update($request->validated());

        return redirect()->route('supplies.index')->with('success', __('Supply updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supply $supply)
    {
        $supply->delete();

        return redirect()->route('supplies.index')->with('success', __('Supply deleted successfully.'));
    }
}
