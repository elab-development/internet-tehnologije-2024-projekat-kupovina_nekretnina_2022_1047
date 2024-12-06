<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agent>
 */
class AgentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       //za definisanje random domena
       $nizDomena = array('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com');
       $domen = $this->faker->randomElement($nizDomena);

       //za spajanje imena za email adresu
       $imePrezime = $this->faker->name();
       $imePrezimeBezRazmaka = strtolower(str_replace(' ', '', $imePrezime));


       return [

           'imePrezime' => $imePrezime,
           'grad' => $this->faker->city(),
           'adresa' => $this->faker->streetAddress(),
           'email' => "$imePrezimeBezRazmaka@$domen",
           'telefon' => $this->faker->phoneNumber(),
       ];
    }
}
