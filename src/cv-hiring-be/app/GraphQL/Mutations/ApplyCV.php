<?php

namespace App\GraphQL\Mutations;

use App\Jobs\SendEmailJob;
use App\Mail\EmailAppliedCv;
use App\Models\WorkApply;
use App\Models\WorkJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
        $job = WorkJob::findOrFail($jobId);
        $user = Auth::user();

        $path = Storage::putFile('public/avatars', $fileCV);

        dispatch(new SendEmailJob($user->email, $job));

        $workApply = WorkApply::create([
            'cv_url'    => $path,
            'letter'    => $content,
            'status'    => 1,
            'work_job_id'   => $jobId,
            'user_id'   => $user->id
        ]);

        return [
            "id" => $workApply->id,
            "path"  => $path
        ];
    }
}
