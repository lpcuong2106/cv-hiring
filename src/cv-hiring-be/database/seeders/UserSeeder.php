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
            'firstname' => 'le',
            'avatar'    => 'https://yt3.ggpht.com/rV6TeGh8F5Jfjp8m6qeiTTykIC4E_fadF6m362not7PW23eBmltdzh5eigEoyRhyFJATzDNTt1k=s48-c-k-c0x00ffffff-no-rj',
            'email' => 'noname21062000@gmail.com',
            'gender'    =>  1,
            'address'   => '15/11 dong',
            'phone'     => '0349265776',
            'birthday'  => now(),
            'email_verified_at' => now(),
            'password' => bcrypt('08081508'), // password
            'role_id'   => 1,
            'company_id'    => 1
        ]);
    }
}
