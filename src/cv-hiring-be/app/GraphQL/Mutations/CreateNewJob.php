<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkJob;
use Exception;
use Illuminate\Support\Str;

class CreateNewJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            // TODO implement the resolver

            $name = $args["input"]["name"];
            $description = $args["input"]["description"];
            $benefit = $args["input"]["benefit"];
            $requirement = $args["input"]["requirement"];
            $requirement_exp = $args["input"]["requirement_exp"];
            $requirement_gender = $args["input"]["requirement_gender"];
            $requirement_age = $args["input"]["requirement_age"];
            $amount_hiring = $args["input"]["amount_hiring"];
            $address_work = $args["input"]["address_work"];
            $salary = $args["input"]["salary"];
            $type = $args["input"]["type"];
            $expired_date_hiring = $args["input"]["expired_date_hiring"];
            $province_id = $args["input"]["province_id"];
            $company_id = $args["input"]["company_id"];
            $work_category_id = $args["input"]["work_category_id"];

            WorkJob::create([
                "slug"  => Str::slug($name) . rand(10, 1000),
                "name" => $name,
                "description" => $description,
                "benefit" => $benefit,
                "requirement" => $requirement,
                "requirement_exp" => $requirement_exp,
                "requirement_gender" => $requirement_gender,
                "requirement_age" => $requirement_age,
                "amount_hiring" => $amount_hiring,
                "address_work" => $address_work,
                "salary" => $salary,
                "type" => $type,
                "is_open"   => 1,
                "amount_apply"  => 0,
                "amount_accept" => 0,
                "expired_date_hiring" => $expired_date_hiring,
                "province_id" => $province_id,
                "company_id" => $company_id,
                "work_category_id" => $work_category_id,
            ]);

            return [
                'status' => 'OK',
                'message'   => 'Tạo thành công'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
