<?php

namespace Database\Seeders;

use App\Models\WorkJob;
use Illuminate\Database\Seeder;

class WorkJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        WorkJob::factory()->count(80)->create();
    }
}
