<?php

namespace App\Providers;

use App\Models\User;
use App\Models\WorkJob;
use App\Observers\UserObserver;
use App\Observers\WorkJobObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        WorkJob::observe(WorkJobObserver::class);
        User::observe(UserObserver::class);
    }
}
