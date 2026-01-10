<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionSeeder::class);

        // User::factory(10)->create();

        $user = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $user->assignRole('PRODUCTOR');

        $veterinarian = User::firstOrCreate([
            'email' => 'vet@example.com',
        ], [
            'name' => 'Veterinarian User',
            'email' => 'vet@example.com',
            'password' => bcrypt('password'),
        ]);

        $veterinarian->assignRole('VETERINARIO');

        // Create sample data
        \App\Models\Breed::factory(3)->create();
        \App\Models\Lot::factory(3)->create();
        \App\Models\FeedType::factory(4)->create();
        \App\Models\Supply::factory(10)->create();
        \App\Models\Animal::factory(50)->create();
        \App\Models\Weighing::factory(100)->create();
        \App\Models\HealthRecord::factory(30)->create();
        \App\Models\Feeding::factory(60)->create();
    }
}
