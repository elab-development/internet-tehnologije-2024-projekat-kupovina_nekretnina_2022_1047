<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'buyer'
        ]);

       $token = $user->createToken('auth_token')->plainTextToken;

       return response()->json([
            'message' => 'Registered successfully',
            'user' => new UserResource($user),
            'token' => $token,
       ], 201); 
        
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if (!Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            return response()->json(['error' => 'Bad credentials'], 401);
        }
    
        $user = User::where('email', $validated['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Logged in successfully',
            'user' => new UserResource($user),
            'token' => $token,
        ], 200);
    }
    

   
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
