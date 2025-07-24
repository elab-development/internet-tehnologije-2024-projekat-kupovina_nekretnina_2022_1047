<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kupovina;
use App\Http\Resources\KupovinaResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class KupovinaController extends Controller
{

    private function authorizeBuyer()
    {
        if (!auth()->check() || auth()->user()->role !== 'buyer') {
            abort(403, 'Access denied. Only buyers can perform this action.');
        }
    }

    private function authorizeAdmin()
    {
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Access denied. Only admins can view metrics.');
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

   /**
     * GET /api/kupovine/metrics
     * only for admins
    */
    public function metrics()
    {
        $this->authorizeAdmin();

        // total number of purchases
        $totalPurchases = Kupovina::count();

        // total amount spent (sum of property prices)
        $totalAmountSpent = DB::table('kupovine')
            ->join('nekretnine', 'kupovine.nekretnina_id', '=', 'nekretnine.id')
            ->sum('nekretnine.cena');

        // number of purchases grouped by status_kupovine
        $purchasesByStatus = DB::table('kupovine')
            ->select('status_kupovine', DB::raw('count(*) as count'))
            ->groupBy('status_kupovine')
            ->pluck('count', 'status_kupovine');

        // number of purchases grouped by payment method
        $purchasesByPayment = DB::table('kupovine')
            ->select('nacinPlacanja', DB::raw('count(*) as count'))
            ->groupBy('nacinPlacanja')
            ->pluck('count', 'nacinPlacanja');

        return response()->json([
            'metrics' => [
                'total_purchases'       => $totalPurchases,
                'total_amount_spent'    => $totalAmountSpent,
                'purchases_by_status'   => $purchasesByStatus,
                'purchases_by_payment'  => $purchasesByPayment,
            ]
        ]);
    }
}
