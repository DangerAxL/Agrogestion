<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HealthRecord>
 */
class HealthRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'animal_id' => \App\Models\Animal::factory(),
            'type' => $this->faker->randomElement(['vaccination', 'treatment', 'checkup', 'disease']),
            'description' => $this->faker->sentence(),
            'date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'veterinarian_id' => 1, // Assuming user ID 1 exists
            'cost' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}
