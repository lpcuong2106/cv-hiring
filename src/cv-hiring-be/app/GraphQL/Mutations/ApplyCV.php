<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkApply;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ApplyCV
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {

        $fileCV = $args['fileCV'];
        $content = $args['content'];
        $jobId = $args['jobId'];
        if (!Auth::check()) {
            return [
                "id" => null,
                "path"  => null
            ];
        }

        $userId = Auth::user()->id;

        $path = Storage::putFile('public/avatars', $fileCV);

        $workApply = WorkApply::create([
            'cv_url'    => $path,
            'letter'    => $content,
            'status'    => 1,
            'work_job_id'   => $jobId,
            'user_id'   => $userId
        ]);

        return [
            "id" => $workApply->id,
            "path"  => $path
        ];
    }
}
