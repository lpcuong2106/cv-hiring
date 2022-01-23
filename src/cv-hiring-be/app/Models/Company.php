<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $appends = [
        'amount_job_hiring'  
    ];

    public function logo(){
        return $this->morphMany(Image::class, 'imageable');
    }

    public function workJobs(){
        return $this->hasMany(WorkJob::class);
    }

    public function getAmountJobHiringAttribute(){
        $workHiring = WorkJob::where('is_open', 1)
            ->orWhere('expired_date', '<=', now())->count(); 
        return $workHiring;
    }

}
