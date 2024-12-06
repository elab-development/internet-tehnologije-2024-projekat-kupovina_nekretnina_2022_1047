<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;


    protected $table = 'agenti';

    protected $fillable = [
        'imePrezime',
        'grad',
        'adresa',
        'email',
        'telefon',
    ];

    public function kupovine()
    {
        return $this->hasMany(Kupovina::class);
    }
}