<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Nevena',
            'email' => 'nevena.admin@gmail.com',
            'password' => Hash::make('nevena1'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Bojana',
            'email' => 'bojana.admin@gmail.com',
            'password' => Hash::make('bojana'),
            'role' => 'admin',
        ]);

        User::factory()->count(10)->create([
            'role' => 'buyer',
        ]);
    }
}
