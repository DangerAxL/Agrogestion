<?php

use App\Models\Animal;
use App\Models\Feeding;
use App\Models\Lot;
use App\Models\Weighing;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('production trends returns correct data structure', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    Animal::factory()->create(['withdrawal_date' => now(), 'active' => false, 'weight_current' => 100]);

    $response = $this->getJson('/api/analytics/production-trends');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'labels',
            'datasets' => [
                '*' => [
                    'label',
                    'data',
                ],
            ],
            'filters',
        ]);
});

test('animal growth returns correct data structure', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $animal = Animal::factory()->create();
    Weighing::factory()->create(['animal_id' => $animal->id, 'weight' => 50, 'date' => now()]);

    $response = $this->getJson('/api/analytics/animal-growth');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'weight' => [
                'labels',
                'datasets',
            ],
            'growth_rate' => [
                'labels',
                'datasets',
            ],
            'filters',
        ]);
});

test('feed consumption returns correct data structure', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $lot = Lot::factory()->create();
    Feeding::factory()->create(['lot_id' => $lot->id, 'total_ration' => 100]);

    $response = $this->getJson('/api/analytics/feed-consumption');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'labels',
            'datasets' => [
                '*' => [
                    'label',
                    'data',
                ],
            ],
            'filters',
        ]);
});

test('get lots returns lots data', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    Lot::factory()->create(['name' => 'Test Lot']);

    $response = $this->getJson('/api/analytics/lots');

    $response->assertStatus(200)
        ->assertJsonStructure([
            '*' => ['id', 'name'],
        ]);
});

test('get animals returns animals data', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    Animal::factory()->create(['caravana' => 'ABC123']);

    $response = $this->getJson('/api/analytics/animals');

    $response->assertStatus(200)
        ->assertJsonStructure([
            '*' => ['id', 'caravana'],
        ]);
});

test('export production trends csv downloads file', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    Animal::factory()->create(['withdrawal_date' => now(), 'active' => false, 'weight_current' => 100]);

    $response = $this->get('/api/analytics/export/production-trends/csv');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'text/csv');
});

test('export animal growth csv downloads file', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $animal = Animal::factory()->create();
    Weighing::factory()->create(['animal_id' => $animal->id, 'weight' => 50, 'date' => now()]);

    $response = $this->get('/api/analytics/export/animal-growth/csv');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'text/csv');
});

test('export feed consumption csv downloads file', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $lot = Lot::factory()->create();
    Feeding::factory()->create(['lot_id' => $lot->id, 'total_ration' => 100]);

    $response = $this->get('/api/analytics/export/feed-consumption/csv');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'text/csv');
});
