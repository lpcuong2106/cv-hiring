<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'amount_employee',
        'website',
        'fanpage',
        'address',
        'gg_map',
        'logo',
        'user_id',
        'banner',
    ];

    protected $appends = [
        'amount_job_hiring'
    ];

    public function logo()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function work_jobs()
    {
        return $this->hasMany(WorkJob::class);
    }

    public function getAmountJobHiringAttribute()
    {
        $workHiring = $this->work_jobs->where('is_open', 1)->where('expired_date_hiring', '>=', now())
            ->count();
        return $workHiring;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
