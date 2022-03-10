<?php

namespace App\GraphQL\Queries;

use App\Models\WorkCategory;

class AnalystTrend
{

    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {

        $analystCate = [];
        $categories = WorkCategory::all();

        foreach ($categories as $cate) {
            array_push($analystCate, [
                'name'      => $cate->name,
                'amountJob' => $cate->workJob->count()
            ]);
        }

        $analystCate = collect($analystCate)->sortBy('amountJob')->reverse()->toArray();

        return [
            'category'  => $analystCate
        ];
    }
}
