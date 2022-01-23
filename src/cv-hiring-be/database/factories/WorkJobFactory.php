<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WorkJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'          => $this->faker->name(),
            'company_id'    => 1,
            'slug'          => $this->faker->slug(),
            'description'   => $this->faker->name(),
            'benefit'       => $this->faker->name(),
            'requirement'   => $this->faker->name(),
            'requirement_exp'       => $this->faker->name(),
            'requirement_gender'    => $this->faker->name(),
            'amount_hiring'         => $this->faker->numerify('###'),
            'amount_apply'          => $this->faker->numerify('###'),
            'amount_accept'         => $this->faker->numerify('###'),
            'address_work'          => $this->faker->numerify('###'),
            'salary'                => $this->faker->numerify('###'),
            'type'                  => $this->faker->numerify('###'),
            'is_open'               => rand(0,1),
            'expired_date'          => now(),
            'province_id'           => rand(1,63),
            'work_category_id'      => rand(1,20)
        ];
    }
}

