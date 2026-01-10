<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feeding>
 */
class FeedingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lot_id' => \App\Models\Lot::factory(),
            'feed_type_id' => \App\Models\FeedType::factory(),
            'date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'ration_kg' => $this->faker->randomFloat(2, 1, 5),
            'total_ration' => $this->faker->randomFloat(2, 10, 100),
        ];
    }
}
