<?php

namespace Database\Seeders;

use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\Ship;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $destinations = [
            ['Valparaíso', -33.0458, -71.6197],
            ['San Diego', 32.715, -117.1625],
            ['Auckland', -36.85, 174.783333],
            ['Sydney', -33.867778, 151.21],
            ['Tokio', 35.6895, 139.69171],
            ['Shanghai', 31.22222, 121.45806],
            ['Hamburgo', 53.55073, 9.99302],
            ['Génova', 44.414165, 8.942184],
            ['Suez Canal Container Terminal', 31.211439, 32.357111],
            ['Durban', 30.033333, 31.233334],
            ['Santos', -23.960833, -46.333889],
        ];

        foreach($destinations as $d) {
            Destination::create([
                'name' => $d[0],
                'position' => new Point($d[1], $d[2]),
            ]);
        }

        Ship::factory(200)->create();

    }
}
