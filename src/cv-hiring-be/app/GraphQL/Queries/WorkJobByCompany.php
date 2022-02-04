<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class WorkJobByCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $companyId = $args['companyId'];

        $workApply = WorkJob::where('company_id', $companyId)
            ->orderBy('updated_at', 'desc')
            ->paginate();

        $pagination = [
            'total' => $workApply->total(),
            'lastItem'  => $workApply->lastItem(),
            'firstItem' => $workApply->firstItem(),
            'perPage'   =>  $workApply->perPage(),
            'currentPage'   => $workApply->currentPage(),
            'lastPage'  => $workApply->lastPage(),
            'count'     => $workApply->count(),
            'hasMorePages'  => $workApply->hasMorePages()
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $workApply
        ];
    }
}
