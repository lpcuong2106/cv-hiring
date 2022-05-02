<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'review'    => 'Công ty tốt chất lượng cao',
            'rating'    => rand(1, 5),
            'model_type'    => 'App\Models\Company',
            'model_id'  => rand(1, 20),
            'author_type'   => 'App\Models\User',
            'author_id' => rand(6, 7, 8),
        ];
    }
}
