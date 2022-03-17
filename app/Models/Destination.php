<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;
    use SpatialTrait;
    protected $fillable = ['name', 'position'];
    protected $spatialFields = ['position'];
}
