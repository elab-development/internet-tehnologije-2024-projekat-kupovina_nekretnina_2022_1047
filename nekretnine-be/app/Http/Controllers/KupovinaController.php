<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kupovina;
use App\Http\Resources\KupovinaResource;
use Illuminate\Support\Facades\Auth;

class KupovinaController extends Controller
{

    private function authorizeBuyer()
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            abort(403, 'Access denied. Only buyers can perform this action.');
        }
    }

    public function index()
    {
        $this->authorizeBuyer();

        $kupovine = Kupovina::where('user_id', auth()->id())
        ->with(['user', 'agent', 'nekretnina']) ->get();

        return response()->json([
            'message' => 'Your purchases retrieved successfully!',
            'kupovine' => KupovinaResource::collection($kupovine),
        ]);
    }

    public function show($id)
    {
        $this->authorizeBuyer();

        $kupovina = Kupovina::where('id', $id)->where('user_id', auth()->id())
        ->with(['user', 'agent', 'nekretnina']) ->first();

        if (!$kupovina) {
            return response()->json(['error' => 'Purchase not found or access denied.'], 403);
        }

        $kupovina = Kupovina::with(['user', 'agent', 'nekretnina'])->find($kupovina->id);

        return response()->json([
            'message' => 'Purchase retrieved successfully!',
            'kupovina' => new KupovinaResource($kupovina),
        ]);
    }

    public function store(Request $request)
    {
         $this->authorizeBuyer();

        $validated = $request->validate([
            'nekretnina_id' => 'required|exists:nekretnine,id',
            'agent_id'=> 'required|exists:agenti,id',
            'datum' => 'required|date',
            'nacinPlacanja' => 'required|string',
            'status_kupovine' => 'required|string',
        ]);

        $kupovina = Kupovina::create([
            'user_id' => auth()->id(),
            'nekretnina_id' => $validated['nekretnina_id'],
            'agent_id' => $validated['agent_id'],
            'datum' => $validated['datum'],
            'nacinPlacanja' => $validated['nacinPlacanja'],
            'status_kupovine' => $validated['status_kupovine'],
        ]);

        // Ucitavanje relacija
        $kupovina = Kupovina::with(['user', 'agent', 'nekretnina'])->find($kupovina->id);

        return response()->json([
            'message' => 'Purchase of property done successfully!',
            'kupovina' => new KupovinaResource($kupovina),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $this->authorizeBuyer();

        $kupovina = Kupovina::with(['user', 'agent', 'nekretnina'])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$kupovina) {
            return response()->json(['error' => 'Purchase not found or access denied.'], 403);
        }

        $validated = $request->validate([
            'datum' => 'nullable|date',
            'nacinPlacanja' => 'nullable|string',
            'status_kupovine' => 'nullable|string',
        ]);

        $kupovina->update($validated);

        return response()->json([
            'message' => 'Purchase updated successfully!',
            'kupovina' => new KupovinaResource($kupovina),
        ]);
    }
    public function destroy($id)
    {
        $this->authorizeBuyer();

        $kupovina = Kupovina::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$kupovina) {
            return response()->json(['error' => 'Purchase not found or access denied.'], 403);
        }

        $kupovina->delete();

        return response()->json([
            'message' => 'Purchase deleted successfully!',
        ]);
    }
}
