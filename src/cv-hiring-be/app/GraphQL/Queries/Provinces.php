<?php

namespace App\GraphQL\Queries;

use HoangPhi\VietnamMap\Models\Province;

class Provinces
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $provinces = Province::all();
        return $provinces;
    }
}
