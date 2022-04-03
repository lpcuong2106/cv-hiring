<?php

namespace App\GraphQL\Queries;

use App\Models\WorkCategory;

class WorkCategories
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $name = isset($args['name']) ? $args['name'] : null;
        $workCategory = WorkCategory::when($name, function ($query, $name) {
            return $query->where('name', 'like', '%' . $name . '%');
        })->get();
        return $workCategory;
    }
}
