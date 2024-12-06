<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KupovinaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'nacinPlacanja' => $this->nacinPlacanja,
            'status_kupovine' => $this->status_kupovine,
            'user' => new UserResource($this->whenLoaded('user')),
            'agent' => new AgentResource($this->whenLoaded('agent')),
            'nekretnina' => new NekretninaResource($this->whenLoaded('nekretnina')),
        ];
    }
}
