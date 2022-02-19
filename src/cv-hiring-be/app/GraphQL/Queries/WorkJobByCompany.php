<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;
use Illuminate\Support\Facades\Auth;

class WorkJobByCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $companyId = isset($args['companyId']) ? $args['companyId'] : null;
        $page = $args['page'];
        $userLogged = Auth::user();
        if (isset($userLogged)) {
            $isAdmin = $userLogged->isAdmin();
            if ($isAdmin) {
                $workApply = WorkJob::orderBy('updated_at', 'desc')->orderBy('company_id', 'desc')
                    ->paginate(10, ['*'], 'page', $page);;
            } else {
                $workApply = WorkJob::when($companyId, function ($query, $companyId) {
                    return  $query->where('company_id', $companyId);
                })
                    ->orderBy('updated_at', 'desc')
                    ->paginate(10, ['*'], 'page', $page);
            }


            $pagination = [
                'total' => $workApply->total(),
                'lastItem'  => $workApply->lastItem(),
                'firstItem' => $workApply->firstItem(),
                'perPage'   =>  $workApply->perPage(),
                'currentPage'   => $workApply->currentPage(),
                'lastPage'  => $workApply->lastPage(),
                'count'     => $workApply->count(),
                'hasMorePages'  => $workApply->hasMorePages()
            ];
            return [
                'paginatorInfo' => $pagination,
                'data' => $workApply
            ];
        }
    }
}
