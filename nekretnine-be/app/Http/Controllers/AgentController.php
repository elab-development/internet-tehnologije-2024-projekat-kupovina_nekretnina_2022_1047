<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Http\Resources\AgentResource;
use Illuminate\Http\Request;

class AgentController extends Controller
{
 
    public function index()
    {
        $agenti = Agent::all(); 
        return response()->json(AgentResource::collection($agenti), 200);
    }

    public function show($id)
    {
        $agent = Agent::find($id); 

        if (!$agent) {
            return response()->json(['message' => 'Agent not found'], 404);
        }

        return response()->json(new AgentResource($agent), 200);
    }
}
