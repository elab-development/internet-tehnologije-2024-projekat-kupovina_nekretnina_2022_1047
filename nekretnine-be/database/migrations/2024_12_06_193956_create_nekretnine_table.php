<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nekretnine', function (Blueprint $table) {
            $table->id();
            $table->string('adresa',40);
            $table->string('grad',25);
            $table->string('vrstaNekretnine',30);
            $table->integer('povrsina');
            $table->integer('brojSoba');
            $table->decimal('cena', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nekretnine');
    }
};
