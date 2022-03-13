<?php

namespace App\Observers;

use App\Models\LogCoinHistory;
use App\Models\Setting;
use App\Models\WorkJob;
use Error;
use Illuminate\Support\Facades\Auth;

class WorkJobObserver
{
    /**
     * Handle the WorkJob "created" event.
     *
     * @param  \App\Models\WorkJob  $workJob
     * @return void
     */
    public function created(WorkJob $workJob)
    {
        $user = Auth::user();
        if (isset($user)) {
            $setting = Setting::first();
            LogCoinHistory::create([
                'user_id'   => $user->id,
                'coin_used' => -$setting->price_job,
                'message'   => 'Thêm mới tin tuyển dụng #' . $workJob->id
            ]);
        }
    }

    /**
     * Handle the WorkJob "updated" event.
     *
     * @param  \App\Models\WorkJob  $workJob
     * @return void
     */
    public function updated(WorkJob $workJob)
    {
        //
    }

    /**
     * Handle the WorkJob "deleted" event.
     *
     * @param  \App\Models\WorkJob  $workJob
     * @return void
     */
    public function deleted(WorkJob $workJob)
    {
        //
    }

    /**
     * Handle the WorkJob "restored" event.
     *
     * @param  \App\Models\WorkJob  $workJob
     * @return void
     */
    public function restored(WorkJob $workJob)
    {
        //
    }

    /**
     * Handle the WorkJob "force deleted" event.
     *
     * @param  \App\Models\WorkJob  $workJob
     * @return void
     */
    public function forceDeleted(WorkJob $workJob)
    {
        //
    }
}
