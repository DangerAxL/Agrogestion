<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBreedRequest;
use App\Http\Requests\UpdateBreedRequest;
use App\Models\Breed;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BreedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            Log::info('BreedController index called');
            $breeds = Breed::withCount('animals')->paginate(15);
            Log::info('Breeds loaded successfully', ['count' => $breeds->count()]);
        } catch (\Exception $e) {
            Log::error('Error loading breeds', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('livestock/Breeds/Index', [
            'breeds' => $breeds,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('livestock/Breeds/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBreedRequest $request)
    {
        Breed::create($request->validated());

        return redirect()->route('breeds.index')->with('success', __('Breed created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Breed $breed)
    {
        $breed->load('animals');

        return Inertia::render('livestock/Breeds/Show', [
            'breed' => $breed,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Breed $breed)
    {
        return Inertia::render('livestock/Breeds/Edit', [
            'breed' => $breed,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBreedRequest $request, Breed $breed)
    {
        $breed->update($request->validated());

        return redirect()->route('breeds.index')->with('success', __('Breed updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Breed $breed)
    {
        $breed->delete();

        return redirect()->route('breeds.index')->with('success', __('Breed deleted successfully.'));
    }
}
