<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NekretninaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray( $request): array
    {
        return [
            'id' => $this->id,
            'vrstaNekretnine' => $this->vrstaNekretnine,
            'grad'=> $this->grad,
            'adresa' => $this->adresa,
            'povrsina' => $this->povrsina,
            'brojSoba'=> $this->brojSoba,
            'cena' => $this->cena,
            
            
           
    
            
        ];
    }
}
