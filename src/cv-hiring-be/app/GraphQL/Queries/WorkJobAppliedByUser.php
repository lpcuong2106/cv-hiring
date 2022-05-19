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
        $page = isset($args['page']) ? $args['page'] : null;
        $workJobAppied = WorkApply::withTrashed()->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate(10, ['*'], 'page', $page);
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
