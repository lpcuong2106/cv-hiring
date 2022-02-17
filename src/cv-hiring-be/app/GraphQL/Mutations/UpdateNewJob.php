<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkJob;
use Exception;
use Illuminate\Support\Str;

class UpdateNewJob
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            // TODO implement the resolver
            $id = $args['input']['id'];
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
            $work_category_id = $args["input"]["work_category_id"];


            $workJob = WorkJob::find($id);
            $workJob->name = $name;
            $workJob->description = $description;
            $workJob->benefit = $benefit;
            $workJob->requirement = $requirement;
            $workJob->requirement_exp = $requirement_exp;
            $workJob->requirement_gender = $requirement_gender;
            $workJob->requirement_age = $requirement_age;
            $workJob->amount_hiring = $amount_hiring;
            $workJob->address_work = $address_work;
            $workJob->salary = $salary;
            $workJob->type = $type;
            $workJob->expired_date_hiring = $expired_date_hiring;
            $workJob->province_id = $province_id;
            $workJob->work_category_id = $work_category_id;

            $workJob->save();

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật thành công'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
