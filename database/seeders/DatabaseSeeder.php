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

        $productor = User::firstOrCreate([
            'email' => 'maximiliano@feedlot.com',
        ], [
            'name' => 'Maximiliano Areco',
            'email' => 'maximiliano@feedlot.com',
            'password' => bcrypt('maximiliano1'),
        ]);

        $productor->assignRole('PRODUCTOR');

        $veterinarian = User::firstOrCreate([
            'email' => 'vet@example.com',
        ], [
            'name' => 'Veterinarian User',
            'email' => 'vet@example.com',
            'password' => bcrypt('password'),
        ]);

        $veterinarian->assignRole('VETERINARIO');

        // Create sample data
        \App\Models\Breed::factory()->createMany([
            ['name' => 'Angus'],
            ['name' => 'Hereford'],
            ['name' => 'Charolais'],
            ['name' => 'Braford'],
            ['name' => 'Bonsmara'],
            ['name' => 'Holando Argentino'],
        ]);
        \App\Models\Lot::factory(3)->create();
        \App\Models\FeedType::factory()->createMany([
            ['name' => 'Maíz', 'composition' => 'Alto en energía'],
            ['name' => 'Sorgo', 'composition' => 'Proteína vegetal'],
            ['name' => 'Soja', 'composition' => 'Alto en proteína'],
            ['name' => 'Cebada', 'composition' => 'Fibra digestible'],
        ]);
        \App\Models\Supply::factory(10)->create();
        \App\Models\Animal::factory(50)->create()->each(function ($animal) {
            \App\Models\Stage::create([
                'stage_name' => 'Recría', // Default stage for seeded data
                'animal_id' => $animal->id,
            ]);
            \App\Models\Caravana::create([
                'caravana_nro' => 'C-' . str_pad($animal->id, 5, '0', STR_PAD_LEFT),
                'color' => ['Red', 'Blue', 'Yellow', 'Green'][rand(0, 3)],
                'animal_id' => $animal->id,
            ]);
        });
        \App\Models\Weighing::factory(300)->create();
        \App\Models\Feeding::factory(100)->create();
    }
}
