<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nekretnina>
 */
class NekretninaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'adresa' => $this->faker->streetAddress(),
            'grad' => $this->faker->city(),
            'vrstaNekretnine' => $this->faker->randomElement(['Kuca', 'Stan', 'Vikendica',
             'Poslovni prostor', 'Penthaus', 'Dupleks', 'Vila']),
            'povrsina' => $this->faker->numberBetween($min = 15, $max = 500),
            'brojSoba' => $this->faker->numberBetween($min = 1, $max = 8),
            'cena' => $this->faker->numberBetween($min = 10000, $max = 500000),

        ];
    }
}
