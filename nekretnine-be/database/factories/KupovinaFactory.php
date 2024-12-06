<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\Nekretnina;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kupovina>
 */
class KupovinaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datum' => $this->faker->date(),
            'nacinPlacanja' => $this->faker->randomElement(['Kredit', 'Gotovina', 'Platna kartica']),
            'agent_id' => Agent::factory(),
            'nekretnina_id' => Nekretnina::factory(),
            'user_id' => User::factory(),
            'status_kupovine' => $this->faker->randomElement(['u toku', 'zavrseno',
             'otkazano', 'odbijeno']),
        ];
    }
}
