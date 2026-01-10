<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supply>
 */
class SupplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Vacuna Aftosa', 'Antibiótico', 'Vitaminas', 'Desparasitante', 'Sal mineral']),
            'type' => $this->faker->randomElement(['Sanitario', 'Alimenticio']),
            'stock_current' => $this->faker->randomFloat(2, 10, 1000),
            'unit' => $this->faker->randomElement(['ml', 'mg', 'kg', 'unidades']),
            'min_stock' => $this->faker->randomFloat(2, 5, 50),
        ];
    }
}
