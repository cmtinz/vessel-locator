<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShipController;
use App\Http\Controllers\DestinationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/ships', [ShipController::class, 'index']);
Route::post('/ships', [ShipController::class, 'store']);
Route::get('/ships/{ship}', [ShipController::class, 'show']);
Route::put('/ships/{ship}', [ShipController::class, 'update']);
Route::delete('/ships/{ship}', [ShipController::class, 'destroy']);

Route::get('/destinations', [DestinationController::class, 'index']);