<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

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
            'company_id'    => rand(1, 10),
            'slug'          => $this->faker->slug(),
            'description'   => $this->faker->randomHtml(),
            'benefit'       => $this->faker->name(),
            'requirement'   => $this->faker->name(),
            'requirement_exp'       => 'Không yêu cầu kinh nghiệm',
            'requirement_gender'    => 'Không yêu cầu giới tính',
            'requirement_age'       => 'Không yêu cầu độ tuổi',
            'amount_hiring'         => $this->faker->numerify('###'),
            'amount_apply'          => $this->faker->numerify('###'),
            'amount_accept'         => $this->faker->numerify('###'),
            'address_work'          => $this->faker->address(),
            'salary'                => $this->faker->numerify('###'),
            'type'                  => 'part-time',
            'is_open'               => 1,
            'expired_date_hiring'   => $this->faker->dateTimeBetween('+1 days', '+30 days'),
            'province_id'           => 1,
            'work_category_id'      => 1
        ];
    }
}
