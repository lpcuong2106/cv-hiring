<?php

namespace App\GraphQL\Queries;

use App\Models\User;

class Users
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $users = User::all();
        return $users;
    }
}
