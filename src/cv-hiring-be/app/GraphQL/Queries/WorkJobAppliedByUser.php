<?php

namespace App\GraphQL\Queries;

use App\Models\WorkApply;

class WorkJobAppliedByUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $userId = isset($args['userId']) ? $args['userId'] : null;
        $workJobAppied = WorkApply::where('user_id', $userId)->paginate();
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
