<?php

use App\Models\Animal;
use App\Models\Feeding;
use App\Models\Weighing;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $totalAnimals = Animal::count();
        $activeAnimals = Animal::where('status', 'active')->count();
        $averageWeight = Weighing::avg('weight') ?? 0;
        $totalFeedingsThisWeek = Feeding::where('date', '>=', now()->startOfWeek())->sum('quantity') ?? 0;
        $totalFeedingsThisMonth = Feeding::where('date', '>=', now()->startOfMonth())->sum('quantity') ?? 0;
        $efficiency = $totalAnimals > 0 ? ($totalFeedingsThisMonth / $totalAnimals) : 0;

        return Inertia::render('dashboard', [
            'stats' => [
                'totalAnimals' => $totalAnimals,
                'activeAnimals' => $activeAnimals,
                'averageWeight' => round($averageWeight, 2),
                'feedingsThisWeek' => $totalFeedingsThisWeek,
                'feedingsThisMonth' => $totalFeedingsThisMonth,
                'efficiency' => round($efficiency, 2),
            ],
        ]);
    })->name('dashboard');

    // Livestock resource routes
    Route::resource('animals', \App\Http\Controllers\AnimalController::class);
    Route::resource('lots', \App\Http\Controllers\LotController::class);
    Route::resource('weighings', \App\Http\Controllers\WeighingController::class);
    Route::resource('health-records', \App\Http\Controllers\HealthRecordController::class);
    Route::resource('feedings', \App\Http\Controllers\FeedingController::class);
    Route::resource('supplies', \App\Http\Controllers\SupplyController::class);
    Route::resource('breeds', \App\Http\Controllers\BreedController::class);
    Route::resource('feed-types', \App\Http\Controllers\FeedTypeController::class);
    Route::resource('users', \App\Http\Controllers\UserController::class);

    // Reports routes
    Route::get('reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/animals', [\App\Http\Controllers\ReportController::class, 'animals'])->name('reports.animals');
    Route::get('reports/weighings', [\App\Http\Controllers\ReportController::class, 'weighings'])->name('reports.weighings');
    Route::get('reports/feedings', [\App\Http\Controllers\ReportController::class, 'feedings'])->name('reports.feedings');
    Route::get('reports/health', [\App\Http\Controllers\ReportController::class, 'health'])->name('reports.health');
    Route::get('reports/supplies', [\App\Http\Controllers\ReportController::class, 'supplies'])->name('reports.supplies');

    // Config routes
    Route::get('config', [\App\Http\Controllers\ConfigController::class, 'index'])->name('config.index');
    Route::put('config', [\App\Http\Controllers\ConfigController::class, 'update'])->name('config.update');

    // Documentation routes
    Route::resource('documentation', \App\Http\Controllers\DocumentationController::class);
});

require __DIR__.'/settings.php';
