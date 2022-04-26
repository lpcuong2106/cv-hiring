<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {


        if (!$token = auth()->attempt($args)) {
            return [
                'token' => null,
                'user'  => null,
                'message' => 'Sai tài khoản hoặc mật khẩu'
            ];
        }
        // prevent HR don't have company
        $user = Auth::user();
        if ($user->isHr() && !isset($user->company)) {
            return [
                'token' => null,
                'user'  => null,
                'message'   => "Người dùng này đã bị khóa tài khoản do công ty đã bị xóa"
            ];
        }
        return [
            'token' => $token,
            'user'  => Auth::user(),
            'message' => "Đăng nhập thành công"
        ];
    }
}
