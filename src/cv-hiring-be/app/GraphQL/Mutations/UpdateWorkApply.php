<?php

namespace App\GraphQL\Mutations;

use App\Jobs\SendEmailJob;
use App\Models\WorkApply;
use App\Models\WorkJob;

class UpdateWorkApply
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $workApplyId = isset($args["id"]) ? $args["id"] : null;
        $status =  isset($args["status"]) ? $args["status"] : null;
        $workJobApply = WorkApply::findOrFail($workApplyId);
        $workJobApply->status = $status;
        $workJobApply->save();

        dispatch(new SendEmailJob($workJobApply->user->email, $workJobApply->work_job));
    }
}
