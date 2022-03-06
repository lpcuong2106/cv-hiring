<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class WorkJobOfCategory
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $workCategoryId = $args['categoryId'];
        $workJob = WorkJob::where('work_category_id', $workCategoryId)->jobHiring()->paginate();
        $pagination = [
            'total' => $workJob->total(),
            'lastItem'  => $workJob->lastItem(),
            'firstItem' => $workJob->firstItem(),
            'perPage'   =>  $workJob->perPage(),
            'currentPage'   => $workJob->currentPage(),
            'lastPage'  => $workJob->lastPage(),
            'count'     => $workJob->count(),
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $workJob
        ];
    }
}
