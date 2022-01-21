<?php

namespace App\GraphQL\Queries;

use App\Models\Company;

class TopCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $company = Company::take($args['amount'])->get();
        return $company;
    }
}
