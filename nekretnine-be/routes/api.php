<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\NekretninaController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/agents', [AgentController::class, 'index']);
Route::get('/agents/{id}', [AgentController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
   
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('nekretnine', NekretninaController::class)->only(['index','show', 'store']);
    Route::get('/pretraga-nekretnina', [NekretninaController::class, 'search']); 

});