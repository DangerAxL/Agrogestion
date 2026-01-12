<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedTypeRequest;
use App\Http\Requests\UpdateFeedTypeRequest;
use App\Models\FeedType;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FeedTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            Log::info('FeedTypeController index called');
            $feedTypes = FeedType::paginate(15);
            Log::info('FeedTypes loaded successfully', ['count' => $feedTypes->count()]);
        } catch (\Exception $e) {
            Log::error('Error loading feed types', ['error' => $e->getMessage()]);
            throw $e;
        }

        return Inertia::render('livestock/FeedTypes/Index', [
            'feedTypes' => $feedTypes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('livestock/FeedTypes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedTypeRequest $request)
    {
        FeedType::create($request->validated());

        return redirect()->route('feed-types.index')->with('success', __('Feed type created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(FeedType $feedType)
    {
        return Inertia::render('livestock/FeedTypes/Show', [
            'feedType' => $feedType,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeedType $feedType)
    {
        return Inertia::render('livestock/FeedTypes/Edit', [
            'feedType' => $feedType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedTypeRequest $request, FeedType $feedType)
    {
        $feedType->update($request->validated());

        return redirect()->route('feed-types.index')->with('success', __('Feed type updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeedType $feedType)
    {
        $feedType->delete();

        return redirect()->route('feed-types.index')->with('success', __('Feed type deleted successfully.'));
    }
}
