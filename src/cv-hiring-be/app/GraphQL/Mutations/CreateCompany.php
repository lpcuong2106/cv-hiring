<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use Exception;
use Illuminate\Support\Str;

class CreateCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $name = $args["input"]["name"];
            $description = $args["input"]["description"];
            $amount_employee = $args["input"]["amount_employee"];
            $website = $args["input"]["website"];
            $fanpage = $args["input"]["fanpage"];
            $address = $args["input"]["address"];
            $gg_map = $args["input"]["gg_map"];
            $logo = $args["input"]["logo"];
            $banner = $args["input"]["banner"];
            $user_id = isset($args["input"]["user_id"]) ? $args["input"]["user_id"] : null;

            $slug = Str::slug($name);
            $companyExist = Company::where('slug', $slug)->count();
            if ($companyExist > 0) {
                $slug = $slug . rand(1, 1000);
            }

            // TODO implement the resolver
            Company::create([
                'slug'  => $slug,
                'name'  => $name,
                'description' => $description,
                'amount_employee' => $amount_employee,
                'website' => $website,
                'fanpage'   => $fanpage,
                'address' => $address,
                'gg_map' => $gg_map,
                'logo' => $logo,
                'banner' => $banner,
                'user_id'   => $user_id,
            ]);

            return [
                'status' => 'OK',
                'message'   => 'Tạo công ty thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
