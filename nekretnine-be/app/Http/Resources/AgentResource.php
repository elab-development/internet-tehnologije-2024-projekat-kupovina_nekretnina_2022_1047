<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
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
            'imePrezime' => $this->imePrezime,
            'email' => $this->email,
            'grad'=> $this->grad,
            'adresa'=> $this->adresa,
            'telefon' => $this->telefon,
        ];
    }
}
