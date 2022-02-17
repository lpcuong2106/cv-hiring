<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use Exception;

class UpdateCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id = $args['input']['id'];
            $name = $args["input"]["name"];
            $description = $args["input"]["description"];
            $amount_employee = $args["input"]["amount_employee"];
            $website = $args["input"]["website"];
            $address = $args["input"]["address"];
            $gg_map = $args["input"]["gg_map"];
            $logo = $args["input"]["logo"];
            $banner = $args["input"]["banner"];
            // TODO implement the resolver
            $company = Company::findOrFail($id);
            $company->name = $name;
            $company->description = $description;
            $company->amount_employee = $amount_employee;
            $company->website = $website;
            $company->address = $address;
            $company->gg_map = $gg_map;
            $company->logo = $logo;
            $company->banner = $banner;

            $company->save();

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật công ty thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
