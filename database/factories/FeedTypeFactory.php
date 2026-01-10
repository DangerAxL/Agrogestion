<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeedType>
 */
class FeedTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement(['Maíz', 'Sorgo', 'Soja', 'Cebada', 'Trigo', 'Concentrado']),
            'composition' => $this->faker->sentence(),
        ];
    }
}
