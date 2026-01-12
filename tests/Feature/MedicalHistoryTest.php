<?php

use App\Models\Animal;
use App\Models\Breed;
use App\Models\Lot;
use App\Models\MedicalHistory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('medical history can be created', function () {
    $breed = Breed::factory()->create();
    $lot = Lot::factory()->create();
    $animal = Animal::factory()->create(['breed_id' => $breed->id, 'lot_id' => $lot->id]);
    $veterinarian = User::factory()->create();

    $medicalHistory = MedicalHistory::factory()->create([
        'animal_id' => $animal->id,
        'veterinarian_id' => $veterinarian->id,
    ]);

    expect($medicalHistory)->toBeInstanceOf(MedicalHistory::class);
    expect($medicalHistory->animal)->toBeInstanceOf(Animal::class);
    expect($medicalHistory->veterinarian)->toBeInstanceOf(User::class);
});
