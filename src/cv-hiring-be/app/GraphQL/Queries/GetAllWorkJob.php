<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;

class GetAllWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $workJobs = WorkJob::paginate(10);
    
        return $workJobs;
    }
}
