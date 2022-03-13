<?php

namespace Database\Seeders;

use App\Models\WorkCategory;
use Illuminate\Database\Seeder;

class WorkCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        WorkCategory::create([
            'name' => 'Công nghệ thông tin',
        ]);

        WorkCategory::create([
            'name' => 'Kinh doanh/Bán hàng',
        ]);

        WorkCategory::create([
            'name' => 'Biên / Phiên dịch',
        ]);

        WorkCategory::create([
            'name' => 'Báo chí / Truyền hình',
        ]);

        WorkCategory::create([
            'name' => 'Bưu chính - Viễn thông',
        ]);

        WorkCategory::create([
            'name' => 'Bảo hiểm',
        ]);

        WorkCategory::create([
            'name' => 'Bất động sản',
        ]);

        WorkCategory::create([
            'name' => 'Chứng khoán / Vàng / Ngoại tệ',
        ]);

        WorkCategory::create([
            'name' => 'Công nghệ cao',
        ]);

        WorkCategory::create([
            'name' => 'Cơ khí / Chế tạo / Tự động hóa',
        ]);

        WorkCategory::create([
            'name' => 'Du lịch',
        ]);

        WorkCategory::create([
            'name' => 'Dầu khí / Hóa chất',
        ]);

        WorkCategory::create([
            'name' => 'Dệt may / Da giày',
        ]);

        WorkCategory::create([
            'name' => 'Dịch vụ khách hàng',
        ]);

        WorkCategory::create([
            'name' => 'Điện tử viễn thông',
        ]);

        WorkCategory::create([
            'name' => 'Điện / Điện tử / Điện lạnh',
        ]);

        WorkCategory::create([
            'name' => 'Giáo dục / Đào tạo',
        ]);

        WorkCategory::create([
            'name' => 'Hoá học / Sinh học',
        ]);

        WorkCategory::create([
            'name' => 'Hành chính / Văn phòng',
        ]);

        WorkCategory::create([
            'name' => 'IT Phần cứng / Mạng',
        ]);

        WorkCategory::create([
            'name' => 'IT phần mềm',
        ]);

        WorkCategory::create([
            'name' => 'Khách sạn / Nhà hàng',
        ]);

        WorkCategory::create([
            'name' => 'Kế toán / Kiểm toán',
        ]);

        WorkCategory::create([
            'name' => 'Marketing / Truyền thông / Quảng cáo',
        ]);

        WorkCategory::create([
            'name' => 'Ngân hàng / Tài chính',
        ]);

        WorkCategory::create([
            'name' => 'Nhân sự',
        ]);

        WorkCategory::create([
            'name' => 'Nông / Lâm / Ngư nghiệp',
        ]);

        WorkCategory::create([
            'name' => 'Luật / Pháp lý',
        ]);

        WorkCategory::create([
            'name' => 'Quản lý chất lượng (QA/QC)',
        ]);

        WorkCategory::create([
            'name' => 'Thiết kế đồ họa',
        ]);

        WorkCategory::create([
            'name' => 'Tổ chức sự kiện / Quà tặng',
        ]);

        WorkCategory::create([
            'name' => 'Xây dựng',
        ]);

        WorkCategory::create([
            'name' => 'Y tế / Dược',
        ]);

        WorkCategory::create([
            'name' => 'Công nghệ ô tô',
        ]);

        WorkCategory::create([
            'name' => 'Ngành nghề khác',
        ]);
    }
}
