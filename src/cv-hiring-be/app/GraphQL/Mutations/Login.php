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
    
        if (! $token = auth()->attempt($args)) {
            // dd($args);
            return response()->json(['error' => 'Unauthorized'], 401);
        }
       
        return [
            'token' => $token,
            'user'  => Auth::user()
        ];

    }
}
