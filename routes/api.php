<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::get('/analytics/production-trends', [AnalyticsController::class, 'productionTrends']);
    Route::get('/analytics/animal-growth', [AnalyticsController::class, 'animalGrowth']);
    Route::get('/analytics/feed-consumption', [AnalyticsController::class, 'feedConsumption']);
    Route::get('/analytics/lots', [AnalyticsController::class, 'getLots']);
    Route::get('/analytics/animals', [AnalyticsController::class, 'getAnimals']);
    Route::get('/analytics/export/production-trends/csv', [AnalyticsController::class, 'exportProductionTrendsCsv']);
    Route::get('/analytics/export/animal-growth/csv', [AnalyticsController::class, 'exportAnimalGrowthCsv']);
    Route::get('/analytics/export/feed-consumption/csv', [AnalyticsController::class, 'exportFeedConsumptionCsv']);
});
