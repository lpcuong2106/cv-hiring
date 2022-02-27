<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\Storage;

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
            $fanpage = isset($args["input"]["fanpage"]) ? $args["input"]["fanpage"] : null;
            $website = $args["input"]["website"];
            $address = $args["input"]["address"];
            $gg_map = $args["input"]["gg_map"];
            $logo = isset($args["input"]["logo"]) ? $args["input"]["logo"] : null;
            $banner =  isset($args["input"]["banner"]) ? $args["input"]["banner"] : null;
            $user_id = isset($args["input"]["user_id"]) ? $args["input"]["user_id"] : null;


            // TODO implement the resolver
            $company = Company::findOrFail($id);
            $company->name = $name;
            $company->description = $description;
            $company->amount_employee = $amount_employee;
            $company->website = $website;
            $company->address = $address;
            $company->fanpage = $fanpage;
            $company->gg_map = $gg_map;
            if (isset($logo) && $logo->isValid()) {
                $path = Storage::putFile('public/avatars', $logo);
                $company->logo = $path;
            }

            $company->user_id = $user_id;
            if (isset($banner) && $banner->isValid()) {
                $pathBanner = Storage::putFile('public/avatars', $banner);
                $company->banner = $pathBanner;
            }

            $company->save();

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật công ty thành công!',
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
