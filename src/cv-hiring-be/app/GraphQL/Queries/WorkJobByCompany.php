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
        $name = isset($args['name']) ? $args['name'] : null;
        $status = isset($args['status']) ? $args['status'] : null;

        $page = $args['page'];
        $userLogged = Auth::user();
        if (isset($userLogged)) {
            $isAdmin = $userLogged->isAdmin();
            if ($isAdmin) {
                $workApply = WorkJob::orderBy('updated_at', 'desc')->orderBy('company_id', 'desc');
            } else {
                $workApply = WorkJob::when($companyId, function ($query, $companyId) {
                    return  $query->where('company_id', $companyId);
                })
                    ->orderBy('updated_at', 'desc');
            }

            $workApply = $workApply->when($name, function ($query, $name) {
                return $query->where('name', 'like', '%' . $name . '%');
            });
            switch ($status) {
                case 'stopHiring':
                    $workApply =  $workApply->stopJobHiring();
                    break;
                case 'hiring':
                    $workApply =  $workApply->jobHiring();
                    break;
                case 'expire_hiring':
                    $workApply =  $workApply->expiredJobHiring();
                    break;
            }

            $workApply = $workApply
                ->paginate(10, ['*'], 'page', $page);
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
