<?php

use App\Jobs\CheckLowWeightJob;
use App\Jobs\CheckSupplyStockJob;
use App\Models\Animal;
use App\Models\Notification;
use App\Models\Supply;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can view their notifications', function () {
    $user = User::factory()->create();
    $notification = Notification::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->get('/notifications');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->has('notifications.data', 1)
        ->where('notifications.data.0.id', $notification->id)
    );
});

test('notification is created for low weight animal', function () {
    $animal = Animal::factory()->create([
        'weight_entry' => 100,
        'weight_current' => 70,
        'active' => true,
    ]);

    CheckLowWeightJob::dispatch();

    expect(Notification::where('type', 'low_weight')->count())->toBe(1);
});

test('notification is created for low stock supply', function () {
    $supply = Supply::factory()->create([
        'stock_current' => 5,
        'min_stock' => 10,
    ]);

    CheckSupplyStockJob::dispatch();

    expect(Notification::where('type', 'low_stock')->count())->toBe(1);
});

test('notification can be marked as read', function () {
    $user = User::factory()->create();
    $notification = Notification::factory()->create([
        'user_id' => $user->id,
        'read_at' => null,
    ]);

    $response = $this->actingAs($user)->patch("/notifications/{$notification->id}/read");

    $response->assertStatus(200);
    expect($notification->fresh()->read_at)->not->toBeNull();
});

test('user cannot mark others notifications as read', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $notification = Notification::factory()->create([
        'user_id' => $user1->id,
    ]);

    $response = $this->actingAs($user2)->patch("/notifications/{$notification->id}/read");

    $response->assertStatus(403);
});
