<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'slug'  => $this->faker->slug(),
            'name'  => $this->faker->name(),
            'description'   => $this->faker->text(),
            'amount_employee'   => $this->faker->name(),
            'address'   => $this->faker->address(),
            'website'   => $this->faker->url(),
            'fanpage'   => $this->faker->url(),
            'gg_map'    => $this->faker->url(),
            'logo'      => $this->faker->imageUrl(),
            'banner'    => $this->faker->imageUrl(1024,360),
        ];
    }
}
