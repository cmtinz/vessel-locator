<?php

namespace App\Http\Resources;
use App\Models\Destination;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        
        $destination = Destination::find($this->destination_id);
        
        return  [
            'id' => $this->id,
            'name' => $this->name,
            'latitude' => $this->position->getLat(),
            'longitude' => $this->position->getLng(),
            'destination' => [
                'id' => $destination->id,
                'name' => $destination->name,
                'latitude' => $destination->position->getLat(),
                'longitude' => $destination->position->getLng(),
            ],
            'direction' => $this->direction
        ];
    }
}
