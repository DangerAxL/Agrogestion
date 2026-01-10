<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Breed>
 */
class BreedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Angus',
                'Hereford',
                'Charolais',
                'Limousin',
                'Simmental',
                'Brangus',
                'Brahman',
                'Santa Gertrudis',
                'Holstein',
                'Jersey',
                'Guernsey',
                'Ayrshire',
                'Shorthorn',
                'Dexter',
                'Devon',
                'Sussex',
            ]),
        ];
    }
}
