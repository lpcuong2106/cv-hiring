<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class NewWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $workApply = WorkJob::jobHiring()->orderBy('updated_at', 'desc')->take($args['amount'])->get();
        return $workApply;
    }
}
