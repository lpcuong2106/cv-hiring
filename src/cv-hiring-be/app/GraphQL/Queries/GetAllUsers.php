<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GetAllUsers
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $page = $args['page'];

        $isAdmin = Auth::user()->isAdmin();
        if ($isAdmin) {
            $users = User::orderBy('role_id', 'desc')->paginate(10, ['*'], 'page', $page);
            $pagination = [
                'total' => $users->total(),
                'lastItem'  => $users->lastItem(),
                'firstItem' => $users->firstItem(),
                'perPage'   =>  $users->perPage(),
                'hasMorePages'  => $users->hasMorePages(),
                'currentPage'   => $users->currentPage(),
                'lastPage'  => $users->lastPage(),
                'count'     => $users->count(),
            ];
            return [
                'paginatorInfo' => $pagination,
                'data' => $users
            ];
        }
    }
}
