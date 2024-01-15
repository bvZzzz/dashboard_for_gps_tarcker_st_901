<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class LogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $evens = [
            'new connection',
            'client disconnected',
            'Server started'
        ];

        $ip = [
            '164.206.171.63',
            '114.223.31.82',
            '127.99.99.130',
            '53.128.1.148',
            '122.85.89.113',
            '170.20.4.155',

        ];

        $rand = array_rand($evens, 1);
        $ipRand = array_rand($ip, 1);

        return [
            'created_at' => now(),
            'event' => $evens[$rand],
            'ip' => fake()->ipv4(),
            'port' => rand(1000, 65000),
            'value' => fake()->words(3, true)
        ];
    }
}
