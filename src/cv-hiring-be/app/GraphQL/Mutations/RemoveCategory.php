<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkCategory;
use Exception;

class RemoveCategory
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id =   $args['id'];
            $workCategory = WorkCategory::findOrFail($id);

            // prevent delete
            foreach ($workCategory->workJob as $workJob) {

                if ($workJob->is_open == 1 && $workJob->expired_date_hiring >= now()) {
                    return [
                        'status' => 'ERROR',
                        'message'   => 'Ngành nghề hiện đang có công việc đang tuyển dụng! Vui lòng ngừng ứng tuyển tất cả các công việc'
                    ];
                }
            }

            $name = $workCategory->name;
            $workCategory->delete();

            return [
                'status' => 'OK',
                'message'   => 'Xóa ngành nghề ' . $name . ' thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
