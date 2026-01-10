<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'caravana' => 'CAR'.$this->faker->unique()->numberBetween(1000, 9999),
            'breed_id' => \App\Models\Breed::inRandomOrder()->first()->id ?? 1,
            'weight_entry' => $this->faker->numberBetween(200, 500),
            'weight_current' => $this->faker->numberBetween(250, 600),
            'status' => $this->faker->randomElement(['active', 'sold', 'dead']),
            'lot_id' => \App\Models\Lot::factory(),
            'active' => $this->faker->boolean(90), // 90% chance of being active
            'entry_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'withdrawal_date' => $this->faker->optional(0.1)->dateTimeBetween('now', '+1 month'), // 10% chance of withdrawal
        ];
    }
}
