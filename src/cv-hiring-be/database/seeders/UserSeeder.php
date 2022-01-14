<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(5)->create();

        User::create([
            'lastname' => 'cuong',
            'firstname'=> 'le',
            'email' => 'noname21062000@gmail.com',
            'gender'    =>  1,
            'username'  => 'noname21062000',
            'address'   => '14/11 dong',
            'phone'     => '0349265776',
            'birthday'  => now(),
            'email_verified_at' => now(),
            'password' => bcrypt('08081508'), // password
            'role_id'   => 1
        ]);
    }
}
