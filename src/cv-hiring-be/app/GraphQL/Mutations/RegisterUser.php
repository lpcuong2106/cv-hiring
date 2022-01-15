<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $exist = User::where('email', $args['email'])->get();
     
        if($exist->count() > 0){
            return [
                'token' => null,
                'user'  => null
            ];
        }

        $user = User::create([
            'email'  => $args['email'],
            'password'  => bcrypt($args['password']),
            'role_id'   => 1,
        ]);
        if (! $token = auth()->login($user)) {
            return [
                'token' => null,
                'user'  => null
            ];
        }
       
        return [
            'token' => $token,
            'user'  => Auth::user()
        ];
    }
}
