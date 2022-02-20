<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class CreateUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $email = $args['input']['email'];
            $role_id = isset($args["input"]["role_id"]) ? $args["input"]["role_id"] : null;
            $password =  isset($args["input"]["password"]) ? $args["input"]["password"] : null;
            $lastname =  isset($args["input"]["lastname"]) ? $args["input"]["lastname"] : null;
            $firstname =  isset($args["input"]["firstname"]) ? $args["input"]["firstname"] : null;


            $isAdmin = Auth::user()->isAdmin();
            if ($isAdmin) {
                $userExist = User::where('email', $email)->count();
                if ($userExist > 0) {
                    return [
                        'status' => 'ERROR',
                        'message'   => 'Email người dùng đã tồn tại'
                    ];
                }
                User::create([
                    'email'     => $email,
                    'password'  => bcrypt($password),
                    'role_id'   => $role_id,
                    'firstname' => $firstname,
                    'lastname'  => $lastname
                ]);

                return [
                    'status' => 'OK',
                    'message'   => 'Tạo người dùng thành công!'
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
