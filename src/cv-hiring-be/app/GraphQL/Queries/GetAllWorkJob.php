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

        $workJobs = WorkJob::jobHiring()
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
            // ->when($rating, function ($query, $rating) {
            //     return $query->join('companies', 'companies.id', '=', 'work_jobs.company_id')
            //         ->leftJoin('reviews', function ($join) {
            //             return $join->on('reviews.model_id', '=', 'companies.id')
            //                 ->where('reviews.model_type', '=', 'App\Models\Company');
            //             // ->groupBy('companies.id', 'work_jobs.id')
            //             // ->avg('reviews.rating')->orderBy('reviews.rating');
            //         });
            // })
            ->when($requirementGender, function ($query, $requirementGender) {
                return $query->where('requirement_gender', $requirementGender);
            })
            // ->whereHas('company', function ($query) {
            //     // dd($query);
            //     return $query->whereHas('reviews')->avg('reviews.rating');
            //     // $query->where('approved', 1)->orderBy('name');
            // });


            // $companies = $workJobs->company();
            // ->groupBy('companies.id', 'work_jobs.id')
            // ->avg('reviews.rating');
            ->paginate(10, ['*'], 'page', $page);

        // dd($workJobs->get());

        $pagination = [
            'total' => $workJobs->total(),
            'lastItem'  => $workJobs->lastItem(),
            'firstItem' => $workJobs->firstItem(),
            'perPage'   =>  $workJobs->perPage(),
            'currentPage'   => $workJobs->currentPage(),
            'hasMorePages'  => $workJobs->hasMorePages(),
            'lastPage'  => $workJobs->lastPage(),
            'count'     => $workJobs->count(),
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $workJobs
        ];
    }
}
