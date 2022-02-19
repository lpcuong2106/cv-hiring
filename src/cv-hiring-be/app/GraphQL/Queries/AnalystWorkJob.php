<?php

namespace App\GraphQL\Queries;

use App\Models\WorkJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AnalystWorkJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $companyId = isset($args['companyId']) ? $args['companyId'] : null;

        $userLogged = Auth::user();
        if (isset($userLogged)) {
            $isAdmin = $userLogged->isAdmin();
            if ($isAdmin) {
                $workJobs = WorkJob::query();
            } else {
                $workJobs = WorkJob::where('company_id', $companyId);
            }
            $totalWorkJob = $workJobs->count();

            $queryJobHiring = $workJobs->jobHiring();
            $totalWorkJobHiring = $queryJobHiring->count();
            $jobsHiring = $queryJobHiring->get();
            $totalCvApplied  = 0;
            foreach ($jobsHiring as $workJob) {
                $totalCvApplied += $workJob->work_applies()->count();
            }

            $totalCvAppliedAccepted = DB::table('work_jobs')->when($isAdmin, function ($query, $companyId) {
                return $query->where('company_id', $companyId);
            })
                ->join('work_applies', 'work_jobs.id', '=', 'work_applies.work_job_id')->where('status', 4)->count();

            return [
                'total_work_job'  => $totalWorkJob,
                'total_work_job_hiring' => $totalWorkJobHiring,
                'total_cv_applied' =>  $totalCvAppliedAccepted,
                'total_cv_new_applied' => $totalCvApplied,
            ];
        }
    }
}
