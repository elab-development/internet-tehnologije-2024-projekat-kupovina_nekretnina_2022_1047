<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\Kupovina;
use App\Models\Nekretnina;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KupovinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Uzimanje svih korisnika sa ulogom buyer
        $buyers = User::where('role', 'buyer')->get();

        foreach ($buyers as $buyer) {
            Kupovina::factory()->create([
                'user_id' => $buyer->id, 
            ]);
        }
    }
}
