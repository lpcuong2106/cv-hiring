<?php

namespace App\GraphQL\Queries;

use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class GetAllCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page = $args['page'];

        $companies = Company::paginate(10, ['*'], 'page', $page);

        $pagination = [
            'total' => $companies->total(),
            'lastItem'  => $companies->lastItem(),
            'firstItem' => $companies->firstItem(),
            'perPage'   =>  $companies->perPage(),
            'currentPage'   => $companies->currentPage(),
            'lastPage'  => $companies->lastPage(),
            'count'     => $companies->count(),
            'hasMorePages'  => $companies->hasMorePages()
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $companies
        ];
    }
}
