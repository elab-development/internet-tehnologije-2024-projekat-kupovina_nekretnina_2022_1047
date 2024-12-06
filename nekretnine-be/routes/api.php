<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route; 


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/agents', [AgentController::class, 'index']);
Route::get('/agents/{id}', [AgentController::class, 'show']);
