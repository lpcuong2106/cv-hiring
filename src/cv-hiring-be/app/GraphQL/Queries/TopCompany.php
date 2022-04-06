<?php

namespace App\GraphQL\Queries;

use App\Models\Company;
use Digikraaft\ReviewRating\Models\Review;
use Illuminate\Support\Facades\DB;

class TopCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // lấy danh sách id company đã được sắp xếp theo review 
        $page = isset($args['page']) ? $args['page'] : 1;
        $perPage = isset($args['amount']) ? $args['amount'] : 10;

        $offset = ($page - 1) * $perPage;
        $companieIds = DB::table('companies')
            ->selectRaw('companies.id,avg(reviews.rating) as avg_rating')
            ->leftJoin('reviews', function ($join) {
                return $join->on('companies.id', '=', 'reviews.model_id')
                    ->where('model_type', 'App\Models\Company');
            })
            ->groupBy('companies.id')
            ->orderBy('avg_rating', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->pluck('companies.id')->toArray();

        $tempStr = implode(',', $companieIds);

        //query company theo id đó
        $companies = Company::whereIn('id', $companieIds)
            ->orderByRaw(DB::raw("FIELD(id, $tempStr)"))
            ->get();

        return $companies;
    }
}
