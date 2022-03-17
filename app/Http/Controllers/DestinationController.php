<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Destination::all()->map(function ($d) {
            return [
                'id' => $d->id,
                'name' => $d->name,
                'latitude' => $d->position->getLat(),
                'longitude' => $d->position->getLng(),
            ];
        });
    }
}
