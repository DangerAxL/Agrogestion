<?php

use App\Models\Animal;
use App\Models\Breed;
use App\Models\HealthAlert;
use App\Models\Lot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('health alert can be created', function () {
    $breed = Breed::factory()->create();
    $lot = Lot::factory()->create();
    $animal = Animal::factory()->create(['breed_id' => $breed->id, 'lot_id' => $lot->id]);
    $user = User::factory()->create();

    $healthAlert = HealthAlert::factory()->create([
        'animal_id' => $animal->id,
        'created_by' => $user->id,
    ]);

    expect($healthAlert)->toBeInstanceOf(HealthAlert::class);
    expect($healthAlert->animal)->toBeInstanceOf(Animal::class);
    expect($healthAlert->creator)->toBeInstanceOf(User::class);
});

test('health alert can be marked as resolved', function () {
    $breed = Breed::factory()->create();
    $lot = Lot::factory()->create();
    $animal = Animal::factory()->create(['breed_id' => $breed->id, 'lot_id' => $lot->id]);
    $user = User::factory()->create();

    $healthAlert = HealthAlert::factory()->create([
        'animal_id' => $animal->id,
        'created_by' => $user->id,
        'resolved' => false,
    ]);

    $healthAlert->update(['resolved' => true, 'resolved_at' => now()]);

    expect($healthAlert->resolved)->toBeTrue();
    expect($healthAlert->resolved_at)->not->toBeNull();
});

test('unresolved scope works', function () {
    $breed = Breed::factory()->create();
    $lot = Lot::factory()->create();
    $animal = Animal::factory()->create(['breed_id' => $breed->id, 'lot_id' => $lot->id]);
    $user = User::factory()->create();

    HealthAlert::factory()->create([
        'animal_id' => $animal->id,
        'created_by' => $user->id,
        'resolved' => true,
    ]);

    $unresolvedAlert = HealthAlert::factory()->create([
        'animal_id' => $animal->id,
        'created_by' => $user->id,
        'resolved' => false,
    ]);

    $unresolvedAlerts = HealthAlert::unresolved()->get();

    expect($unresolvedAlerts)->toHaveCount(1);
    expect($unresolvedAlerts->first()->id)->toBe($unresolvedAlert->id);
});
