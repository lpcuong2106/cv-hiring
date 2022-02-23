<?php

namespace App\GraphQL\Queries;

use App\Models\WorkApply;

class AllCvApplied
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $companyId = isset($args['companyId']) ? $args['companyId'] : null;
        $workJobAppied = WorkApply::withTrashed()
            ->when($companyId, function ($query, $companyId) {
                return $query->join('work_jobs', 'work_applies.work_job_id', 'work_jobs.id')->where('company_id', $companyId);
            })->orderBy('work_applies.created_at', 'desc')->paginate();

        $pagination = [
            'total' => $workJobAppied->total(),
            'lastItem'  => $workJobAppied->lastItem(),
            'firstItem' => $workJobAppied->firstItem(),
            'perPage'   =>  $workJobAppied->perPage(),
            'hasMorePages'  => $workJobAppied->hasMorePages(),
            'currentPage'   => $workJobAppied->currentPage(),
            'lastPage'  => $workJobAppied->lastPage(),
            'count'     => $workJobAppied->count(),
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $workJobAppied
        ];
    }
}
