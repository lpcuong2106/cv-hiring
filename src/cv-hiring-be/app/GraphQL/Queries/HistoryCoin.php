<?php

namespace App\GraphQL\Queries;

use App\Models\LogCoinHistory;

class HistoryCoin
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page =  isset($args['page']) ? $args['page'] : 1;
        $user_id = isset($args['user_id']) ? $args['user_id'] : null;

        $logCoinHistory = LogCoinHistory::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'page', $page);

        $pagination = [
            'total' => $logCoinHistory->total(),
            'lastItem'  => $logCoinHistory->lastItem(),
            'firstItem' => $logCoinHistory->firstItem(),
            'perPage'   =>  $logCoinHistory->perPage(),
            'hasMorePages'  => $logCoinHistory->hasMorePages(),
            'currentPage'   => $logCoinHistory->currentPage(),
            'lastPage'  => $logCoinHistory->lastPage(),
            'count'     => $logCoinHistory->count(),
        ];
        return [
            'paginatorInfo' => $pagination,
            'data' => $logCoinHistory
        ];
    }
}
