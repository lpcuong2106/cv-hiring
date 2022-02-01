<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkApply extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_url',
        'letter',
        'status',
        'work_job_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function work_job()
    {
        return $this->belongsTo(WorkJob::class);
    }
}
