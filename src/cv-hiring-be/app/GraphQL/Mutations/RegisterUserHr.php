<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegisterUserHr
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $exist = User::where('email', $args['email'])->get();

            if ($exist->count() > 0) {
                return [
                    'token' => null,
                    'user'  => null,
                    'message'   => "Người dùng đã tồn tại trong hệ thống"
                ];
            }

            $user = User::create([
                'email'  => $args['email'],
                'firstname' =>  $args['firstname'],
                'lastname' =>  $args['lastname'],
                'password'  => bcrypt($args['password']),
                'role_id'   => isset($args['role_id']) ? $args['role_id'] : 3,
            ]);

            Company::create([
                'slug'          => Str::slug($args['name']) . rand(10, 1000),
                'name'          => $args['name'],
                'address'       => $args['address'],
                'amount_employee' => $args['amount_employee'],
                'user_id'       => $user->id
            ]);

            if (!$token = auth()->login($user)) {
                return [
                    'token' => null,
                    'user'  => null,
                    'message'   => "Xảy ra lỗi khi đăng nhập"
                ];
            }

            return [
                'token' => $token,
                'user'  => Auth::user()
            ];
        } catch (Exception $e) {
            return [
                'token' => null,
                'user'   => null,
                'message'   => $e->getMessage()
            ];
        }
    }
}
