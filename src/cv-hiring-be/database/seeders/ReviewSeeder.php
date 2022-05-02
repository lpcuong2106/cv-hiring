<?php

namespace Database\Seeders;

use Digikraaft\ReviewRating\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i <= 100; $i++) {
            Review::create([
                'review'    => 'Công ty tốt chất lượng cao cmt số ' . $i,
                'rating'    => rand(1, 5),
                'model_type'    => 'App\Models\Company',
                'model_id'  => rand(1, 20),
                'author_type'   => 'App\Models\User',
                'author_id' => rand(6, 8),
            ]);
        }
    }
}
