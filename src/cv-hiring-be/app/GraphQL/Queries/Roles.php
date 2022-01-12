<?php

namespace App\GraphQL\Queries;

use App\Models\Role;

class Roles
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $roles = Role::all();
        return $roles;
    }
}
