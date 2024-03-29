<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'lastname' => $this->faker->name(),
            'firstname' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'gender'    =>  rand(0, 1),
            'address'   => $this->faker->address(),
            'phone'     => $this->faker->text(10),
            'birthday'  => now(),
            'avatar'    => $this->faker->imageUrl(),
            'email_verified_at' => now(),
            'password' => bcrypt('08081508'), // password
            'remember_token' => Str::random(10),
            'role_id'   => rand(1, 3),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
