<?php

namespace Database\Factories;

use App\Models\Animal;
use App\Models\TreatmentCatalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VeterinaryTreatment>
 */
class VeterinaryTreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'treatment_catalog_id' => TreatmentCatalog::factory(),
            'animal_id' => Animal::factory(),
            'applied_at' => $this->faker->date(),
            'dosage' => $this->faker->word(),
            'notes' => $this->faker->sentence(),
        ];
    }
}
