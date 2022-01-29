<?php

namespace App\GraphQL\Queries;

use App\Models\Company;
use App\Models\WorkJob;

class WorkJobHiringOfCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $companyId = $args['companyId'];

        $workApply = WorkJob::where('company_id', $companyId)->jobHiring()
            ->orderBy('updated_at', 'desc')
            ->get();
        return $workApply;
    }
}
