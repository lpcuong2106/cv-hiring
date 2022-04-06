<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;
use Illuminate\Support\Facades\DB;

class GetAllWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page = isset($args['page']) ? $args['page'] : 1;
        $perPage = 10;

        $nameJob = isset($args['name']) ? $args['name'] : null;
        $provinceId =  isset($args['provinceId']) ? $args['provinceId'] : null;
        $categoryId =  isset($args['categoryId']) ? $args['categoryId'] : null;
        $rating =  isset($args['rating']) ? $args['rating'] : null;
        $requirementGender =  isset($args['requirementGender']) ? $args['requirementGender'] : null;
        $type =  isset($args['type']) ? $args['type'] : null;
        $workJobOrderByRating = null;
        if ($rating) {
            $workJobOrderByRating = DB::table('work_jobs')
                ->selectRaw('work_jobs.id , companies.id as company_id, avg(reviews.rating) as avg_rating')
                ->join('companies', function ($join) {
                    return $join->on('companies.id', '=', 'work_jobs.company_id');
                })
                ->leftJoin('reviews', function ($join) {
                    return $join->on('companies.id', '=', 'reviews.model_id')
                        ->where('model_type', 'App\Models\Company');
                })
                ->groupBy('work_jobs.id', 'companies.id')
                ->orderBy('avg_rating', $rating)
                ->pluck('companies.id')->toArray();
        }
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
            ->when($workJobOrderByRating, function ($query, $workJobOrderByRating) {
                $tempStr = implode(',', $workJobOrderByRating);
                return $query->whereIn('id', $workJobOrderByRating)
                    ->orderByRaw(DB::raw("FIELD(id, $tempStr)"));
            })
            ->when($requirementGender, function ($query, $requirementGender) {
                return $query->where('requirement_gender', $requirementGender);
            })
            ->paginate($perPage, ['*'], 'page', $page);


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
