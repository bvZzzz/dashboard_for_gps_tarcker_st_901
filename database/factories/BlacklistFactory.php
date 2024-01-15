<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BlacklistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'created_at' => now(),
            'ip' => fake()->ipv4(),
            'port' => rand(1000, 65000),
            'value' => fake()->words(3, true),
            'attempts' => rand(0, 9)
        ];
    }
}
