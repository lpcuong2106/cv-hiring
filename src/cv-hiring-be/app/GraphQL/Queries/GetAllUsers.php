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
        $name = isset($args['name']) ? $args['name'] : null;
        $role = isset($args['role']) ? $args['role'] : null;
        $role_id = null;

        switch ($role) {
            case 'user':
                $role_id = 2;
                break;
            case 'hr':
                $role_id = 3;
                break;
            case 'admin':
                $role_id = 1;
                break;
        }

        $isAdmin = Auth::user()->isAdmin();
        if ($isAdmin) {
            $users = User::when($name, function ($query, $name) {
                return $query->where('email', 'like', '%' . $name . '%');
            })->when($role_id, function ($query, $role_id) {
                return $query->where('role_id', $role_id);
            })
                ->orderBy('role_id', 'desc')->paginate(10, ['*'], 'page', $page);
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
