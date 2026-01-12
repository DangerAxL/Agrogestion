<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalHistory>
 */
class MedicalHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 year', 'now');
        $withdrawalDays = $this->faker->numberBetween(0, 30);
        $releaseDate = (clone $date)->modify("+{$withdrawalDays} days");

        return [
            'animal_id' => \App\Models\Animal::factory(),
            'type' => $this->faker->randomElement(['Consulta', 'Tratamiento', 'Vacunación', 'Cirugía', 'Diagnóstico']),
            'description' => $this->faker->paragraph(),
            'date' => $date,
            'veterinarian_id' => \App\Models\User::factory(),
            'cost' => $this->faker->randomFloat(2, 100, 5000),
            'withdrawal_days' => $withdrawalDays,
            'release_date' => $releaseDate,
            'observations' => $this->faker->optional(0.7)->paragraph(),
        ];
    }
}
