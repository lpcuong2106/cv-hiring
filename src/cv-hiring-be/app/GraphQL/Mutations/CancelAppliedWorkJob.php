<?php

namespace App\GraphQL\Mutations;

use App\Jobs\SendEmailJob;
use App\Models\WorkApply;
use Exception;

class CancelAppliedWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $workAppliedId = $args['workAppliedId'];
            $workApplied = WorkApply::find($workAppliedId);
            if (isset($workApplied)) {
                $workApplied->delete();
                dispatch(new SendEmailJob($workApplied->user, $workApplied->work_job, 'CancelApplyCV'));
                return [
                    'status' => 'OK',
                    'message'   => 'Xóa thành công'
                ];
            }
            return [
                'status' => 'ERROR',
                'message'   => 'Không tìm thấy workJob'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
