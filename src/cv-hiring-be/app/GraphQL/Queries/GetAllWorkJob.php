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
        $rating =  isset($args['rating']) ? $args['rating'] : null;
        $requirementGender =  isset($args['requirementGender']) ? $args['requirementGender'] : null;
        $type =  isset($args['type']) ? $args['type'] : null;

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
            ->when($type,  function ($query, $type) {
                return $query->where('type',  $type);
            })
            ->when($rating, function ($query, $rating) {
                return $query->join('companies', 'companies.id', '=', 'work_jobs.company_id')
                    ->leftJoin('reviews', function ($join) {
                        return $join->on('reviews.model_id', '=', 'companies.id')
                            ->where('reviews.model_type', '=', 'App\Models\Company');
                    });
            })
            ->when($requirementGender, function ($query, $requirementGender) {
                return $query->where('requirement_gender', $requirementGender);
            })
            ->groupBy('companies.id', 'work_jobs.id')
            ->avg('reviews.rating', 'reviews_avg')
            ->paginate(10, ['*'], 'page', $page);

        // ;

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
