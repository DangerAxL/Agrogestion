<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lot>
 */
class LotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Lote '.$this->faker->numberBetween(1, 10),
            'capacity' => $this->faker->numberBetween(50, 200),
            'description' => $this->faker->sentence(),
            'active' => $this->faker->boolean(80), // 80% chance of being active
        ];
    }
}
