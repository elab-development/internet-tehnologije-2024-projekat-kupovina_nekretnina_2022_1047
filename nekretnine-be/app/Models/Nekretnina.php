<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nekretnina extends Model
{
    use HasFactory;

    protected $table = 'nekretnine';

    protected $fillable = [
        'adresa',
        'grad',
        'vrstaNekretnine',
        'povrsina',
        'brojSoba',
        'cena',
    ];

    public function kupovine()
    {
        return $this->hasMany(Kupovina::class);
    }
}