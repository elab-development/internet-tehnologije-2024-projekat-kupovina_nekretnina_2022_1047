<?php

namespace Database\Seeders;

use App\Models\Nekretnina;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NekretninaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Nekretnina::factory()->times(3)->create();
    }
}
