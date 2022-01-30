<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class GetAllWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page = $args['page'];
        $nameJob = isset($args['name']) ? $args['name'] : null;
        $provinceId =  isset($args['provinceId']) ? $args['provinceId'] : null;
        $categoryId =  isset($args['categoryId']) ? $args['categoryId'] : null;

        $workJob = WorkJob::jobHiring()
            ->when($nameJob, function ($query, $nameJob) {
                return $query->where('name', 'like', '%' . $nameJob . '%');
            })
            ->when($provinceId, function ($query, $provinceId) {
                return $query->where('province_id', $provinceId);
            })
            ->when($categoryId, function ($query, $categoryId) {
                return $query->where('work_category_id',  $categoryId);
            })
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
