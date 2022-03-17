<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class Ship extends Model
{
    use HasFactory;
    use SpatialTrait;

    protected $fillable = ['name', 'position', 'direction', 'destination_id'];
    protected $spatialFields = ['position'];

}
