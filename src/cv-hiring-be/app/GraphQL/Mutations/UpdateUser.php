<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class UpdateUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id = $args['input']['id'];
            $role_id = isset($args["input"]["role_id"]) ? $args["input"]["role_id"] : null;
            $password =  isset($args["input"]["password"]) ? $args["input"]["password"] : null;
            $userCurrent = Auth::user()->id;
            if ($userCurrent == $id) {
                return [
                    'status' => 'ERROR',
                    'message'   => 'Không được cập nhật cho chính bạn'
                ];
            }
            // TODO implement the resolver
            $user = User::findOrFail($id);
            $user->role_id = $role_id;

            if ($password) {
                $user->password = bcrypt($password);
            }

            $user->save();

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật người dùng thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
