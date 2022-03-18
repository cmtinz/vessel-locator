<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use App\Models\Destination;

class ShipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $points = collect([
            [0,0],[-40,21],[13,-33],[36,-43],[-38,-41],[0,63],[-46,106],[-18,67],[-21,-19],[8,-108],[-26,-100],[23,144],[-6,-115],[51,-155]
        ])->random();
        return [
            'name' => $this->faker->name(),
            'position' => new Point(
                $points[0] + $this->faker->randomFloat(-50, 50),
                $points[1] + $this->faker->randomFloat(-50, 50)
            ),
            'destination_id' => Destination::all()->random()->id,
            'direction' => $this->faker->numberBetween(0, 360)
        ];
    }
}
