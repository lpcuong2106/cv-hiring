<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkJob;
use Exception;
use Illuminate\Support\Facades\DB;

class PauseHiring
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id = $args['id'];
            $is_open = $args['is_open'];

            $id = DB::table('work_jobs')
                ->where('id', $id)
                ->update(['is_open' => $is_open]);


            return [
                'status' => 'OK',
                'message'   => 'Cập nhật ngưng ứng tuyển thành công'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
