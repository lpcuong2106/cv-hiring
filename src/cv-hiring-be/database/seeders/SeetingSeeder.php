<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::create([
            'title_web' => 'Sàn kết nối việc làm',
            'description' => 'Sàn kết nối việc làm mang đến một nền tảng toàn diện, giúp ứng viên phát triển được các kỹ năng cá nhân, xây dựng hình ảnh chuyên nghiệp trong mắt nhà tuyển dụng và tiếp cận với các cơ hội việc làm phù hợp.',
            'logo_url' => 'http://localhost:3000/logo.png',
            'fb_url' => 'https://www.facebook.com/sanketnoivieclam',
            'youtube_url' => 'https://www.youtube.com/channel/UCGKj3PgO2U4XGKdCPCiwraA',
            'phone_contact' => '0349265776',
            'price_job' => 10
        ]);
    }
}
