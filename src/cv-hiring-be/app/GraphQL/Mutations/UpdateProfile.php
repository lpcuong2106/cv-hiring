<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UpdateProfile
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {

            $lastname = isset($args["input"]["lastname"]) ? $args["input"]["lastname"] : null;
            $firstname =  isset($args["input"]["firstname"]) ? $args["input"]["firstname"] : null;
            $address =  isset($args["input"]["address"]) ? $args["input"]["address"] : null;
            $phone =  isset($args["input"]["phone"]) ? $args["input"]["phone"] : null;
            $birthday =  isset($args["input"]["birthday"]) ? $args["input"]["birthday"] : null;
            $gender =  isset($args["input"]["gender"]) ? $args["input"]["gender"] : null;
            $avatar =  isset($args["input"]["avatar"]) ? $args["input"]["avatar"] : null;

            $userCurrent = Auth::user();

            if (isset($avatar)) {
                $path = Storage::putFile('public/avatars', $avatar);
                $userCurrent->avatar = $path;
            }
            if (isset($userCurrent)) {
                $userCurrent->lastname = $lastname;
                $userCurrent->firstname = $firstname;
                $userCurrent->address = $address;
                $userCurrent->phone = $phone;
                $userCurrent->birthday = $birthday;
                $userCurrent->gender = $gender;


                $userCurrent->save();
            }

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
