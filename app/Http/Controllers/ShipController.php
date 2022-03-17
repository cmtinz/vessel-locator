<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use App\Models\Ship;
use App\Http\Resources\ShipResource;

class ShipController extends Controller
{

    private $validations = [
        'name' => 'string|required',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
        'direction' => 'required|numeric',
        'destination_id' => 'required|exists:destinations,id',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ShipResource::collection(Ship::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validations)->validate();
        return Ship::create([
            'name' => $request->name,
            'position' => new Point($request->latitude, $request->longitude),
            'destination_id' => $request->destination_id,
            'direction' => $request->direction
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ship  $ship
     * @return \Illuminate\Http\Response
     */
    public function show(Ship $ship)
    {
        return new ShipResource($ship);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ship  $ship
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ship $ship)
    {
        $validator = Validator::make($request->all(), $this->validations)->validate();
        $ship->update([
            'name' => $request->name,
            'position' => new Point($request->latitude, $request->longitude),
            'destination_id' => $request->destination_id,
            'direction' => $request->direction
        ]);
        $ship->save();
        return $ship;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ship  $ship
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ship $ship)
    {
        $ship->delete();
        return response()->noContent();
    }
}