<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HealthAlert>
 */
class HealthAlertFactory extends Factory
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
            'type' => $this->faker->randomElement(['Tratamiento próximo a vencer', 'Retiro finalizando', 'Vacunación pendiente', 'Revisión médica']),
            'message' => $this->faker->sentence(),
            'alert_date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'resolved' => $this->faker->boolean(20), // 20% chance of being resolved
            'resolved_at' => function (array $attributes) {
                return $attributes['resolved'] ? $this->faker->dateTimeBetween('-30 days', 'now') : null;
            },
            'created_by' => \App\Models\User::factory(),
        ];
    }
}
