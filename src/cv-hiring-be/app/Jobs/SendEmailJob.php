<?php

namespace App\Jobs;

use App\Mail\CancelApplyCV;
use App\Mail\EmailAppliedCv;
use App\Mail\NewCVApply;
use App\Mail\UpdateApplyCV;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $workJob;

    public $email;

    public $type;

    public $statusAppliedJob;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $job, $type, $statusAppliedJob = 1)
    {
        $this->email = $email;
        $this->workJob = $job;
        $this->type = $type;
        if ($type == 'UpdateApplyCV') {
            $this->statusAppliedJob = $statusAppliedJob;
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        switch ($this->type) {
            case 'ApplyCV':
                Mail::to($this->email)->send(new EmailAppliedCv($this->workJob));
                break;
            case 'CancelApplyCV':
                Mail::to($this->email)->send(new CancelApplyCV($this->workJob));
                break;
            case 'UpdateApplyCV':
                Mail::to($this->email)->send(new UpdateApplyCV($this->workJob, $this->statusAppliedJob));
                break;
            case 'NewCVApply':
                Mail::to($this->email)->send(new NewCVApply($this->workJob));
                break;
        }
    }
}
