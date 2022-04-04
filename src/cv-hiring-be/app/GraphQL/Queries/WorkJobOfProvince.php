<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class WorkJobOfProvince
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $provinceId = $args['provinceId'];
        $page = isset($args['page']) ? $args['page'] : 1;

        $workJob = WorkJob::where('province_id', $provinceId)
            ->jobHiring()
            ->paginate(10, ['*'], 'page', $page);
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
