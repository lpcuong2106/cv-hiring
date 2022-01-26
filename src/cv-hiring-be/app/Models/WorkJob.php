<?php

namespace App\Models;

use HoangPhi\VietnamMap\Models\Province;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkJob extends Model
{
    use HasFactory;

    public function company(){
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function province(){
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function work_category(){
        return $this->belongsTo(WorkCategory::class, 'work_category_id', 'id');
    }
}
