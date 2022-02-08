<?php

namespace App\Models;

use GraphQL\Type\Definition\ResolveInfo;
use HoangPhi\VietnamMap\Models\Province;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class WorkJob extends Model
{

    use HasFactory;

    protected $fillable = [
        'is_open',
        "slug",
        "name",
        "description",
        "benefit",
        "requirement",
        "requirement_exp",
        "requirement_gender",
        "requirement_age",
        "amount_hiring",
        "address_work",
        "salary",
        "type",
        "expired_date",
        "amount_apply",
        "amount_accept",
        "province_id",
        "company_id",
        "work_category_id",
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function work_category()
    {
        return $this->belongsTo(WorkCategory::class, 'work_category_id', 'id');
    }


    public function scopeJobHiring($query)
    {
        return $query->where('is_open', '=', 1)
            ->where('expired_date', '<=', now());
    }

    public function work_applies()
    {
        return $this->hasMany(WorkApply::class);
    }

    public function statistics($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Builder
    {
        $provinceId = $args['provinceId'];
        $workJob = DB::table('work_jobs')->where('province_id', $provinceId);
        return $workJob;
    }
}
