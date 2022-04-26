<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class RemoveUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id =   $args['id'];
            $currentUser = Auth::user();

            $currentUserId = $currentUser->id;
            $isAdmin = $currentUser->isAdmin();
            if ($isAdmin) {
                if ($currentUserId == $id) {
                    return [
                        'status' => 'ERROR',
                        'message'   => 'Không được xóa chính bạn'
                    ];
                }
                $user = User::findOrFail($id);

                // remove company if user is HR
                $company = $user->company;
                if ($user->isHr() && isset($company)) {
                    $companyName = $company->name;
                    if ($company->amount_job_hiring > 0) {
                        return [
                            'status' => 'ERROR',
                            'message'   => 'Công ty ' . $companyName . ' bạn đang làm chủ hiện đang có công việc đang tuyển dụng! Vui lòng ngừng ứng tuyển tất cả các công việc của công ty này'
                        ];
                    }
                }


                $email = $user->email;
                $user->delete();

                return [
                    'status' => 'OK',
                    'message'   => 'Xóa người dùng ' . $email . ' thành công!'
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
