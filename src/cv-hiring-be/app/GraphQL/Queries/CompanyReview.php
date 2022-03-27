<?php

namespace App\GraphQL\Queries;

use App\Models\Company;

class CompanyReview
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page = isset($args['page']) ? $args['page'] : 1;
        $companySlug = isset($args['slug']) ? $args['slug'] : null;
        $company = Company::where('slug', '=', $companySlug)->first();
        // TODO implement the resolver
        if (isset($company)) {
            $reviews = $company->reviews()->paginate(10, ['*'], 'page', $page);;
            $pagination = [
                'total' => $reviews->total(),
                'lastItem'  => $reviews->lastItem(),
                'firstItem' => $reviews->firstItem(),
                'perPage'   =>  $reviews->perPage(),
                'hasMorePages'  => $reviews->hasMorePages(),
                'currentPage'   => $reviews->currentPage(),
                'lastPage'  => $reviews->lastPage(),
                'count'     => $reviews->count(),
            ];
            return [
                'paginatorInfo' => $pagination,
                'data' => $reviews
            ];
        } else {
            $pagination = [
                'total' => 0,
                'lastItem'  => 0,
                'firstItem' => 0,
                'perPage'   =>  10,
                'hasMorePages'  => false,
                'currentPage'   => $page,
                'lastPage'  => 0,
                'count'     => 0,
            ];
            return [
                'paginatorInfo' => $pagination,
                'data' => []
            ];
        }
    }
}
