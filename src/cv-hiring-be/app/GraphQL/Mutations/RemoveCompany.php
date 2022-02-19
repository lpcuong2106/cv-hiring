<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use Exception;

class RemoveCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id =   $args['id'];
            $company = Company::findOrFail($id);
            if ($company->amount_job_hiring > 0) {
                return [
                    'status' => 'ERROR',
                    'message'   => 'Công ty hiện đang có công việc đang tuyển dụng! Vui lòng ngừng ứng tuyển tất cả các công việc'
                ];
            }
            $name = $company->name;
            $company->delete();

            return [
                'status' => 'OK',
                'message'   => 'Xóa công ty ' . $name . ' thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
