<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Weighing>
 */
class WeighingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'animal_id' => \App\Models\Animal::inRandomOrder()->first()->id ?? \App\Models\Animal::factory(),
            'date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'weight' => $this->faker->numberBetween(200, 600),
            'daily_gain' => $this->faker->randomFloat(3, 0.5, 2.5),
            'created_by' => 1, // Assuming user ID 1 exists
        ];
    }
}
