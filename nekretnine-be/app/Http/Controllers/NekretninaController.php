<?php

namespace App\Http\Controllers;

use App\Models\Nekretnina;
use Illuminate\Http\Request;
use App\Http\Resources\NekretninaResource;

class NekretninaController extends Controller
{
 
    public function index(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
    
        $perPage = $request->query('per_page', 5);
    
        $nekretnine = Nekretnina::paginate($perPage);
    
        return response()->json([
            'message' => 'All properties retrieved successfully!',
            'nekretnine' => NekretninaResource::collection($nekretnine->items()),
            'pagination' => [
                'current_page' => $nekretnine->currentPage(),
                'last_page' => $nekretnine->lastPage(),
                'per_page' => $nekretnine->perPage(),
                'total' => $nekretnine->total(),
            ],
        ]);
    }
    

    public function show($id)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        $nekretnina = Nekretnina::find($id);

        if (!$nekretnina) {
            return response()->json(['error' => 'Property not found.'], 404);
        }

        return response()->json([
            'message' => 'Property retrieved successfully!',
            'nekretnina' => new NekretninaResource($nekretnina),
        ]);
    }

    public function search(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
    
        $perPage = $request->query('per_page', 5);
    
        $vrstaNekretnine = $request->query('vrsta');
    
        $nekretnine = Nekretnina::where('vrstaNekretnine', $vrstaNekretnine)->paginate($perPage);
    
        if ($nekretnine->isEmpty()) {
            return response()->json(['error' => 'No properties found for the given type.'], 404);
        }
    
        return response()->json([
            'message' => 'Properties retrieved successfully!',
            'nekretnine' => NekretninaResource::collection($nekretnine->items()),
            'pagination' => [
                'current_page' => $nekretnine->currentPage(),
                'last_page' => $nekretnine->lastPage(),
                'per_page' => $nekretnine->perPage(),
                'total' => $nekretnine->total(),
            ],
        ]);
    }
    
    //samo admin sajta
    public function store(Request $request)
    {

        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden. Only admins can create properties.'], 403);
        }

        $validated = $request->validate([
            'vrstaNekretnine' => 'required|string',
            'adresa' => 'required|string',
            'grad' => 'required|string',
            'povrsina' => 'required|numeric',
            'brojSoba'=> 'required|numeric',
            'cena' => 'required|numeric',
        ]);

        $nekretnina = Nekretnina::create($validated);

        return response()->json([
            'message' => 'Property created successfully!',
            'nekretnina' => new NekretninaResource($nekretnina),
        ], 201);
    }
}
