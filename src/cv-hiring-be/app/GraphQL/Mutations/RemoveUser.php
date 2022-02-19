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
                        'message'   => 'Không được xóa chính người dùng đang đăng nhập'
                    ];
                }
                $user = User::findOrFail($id);

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
