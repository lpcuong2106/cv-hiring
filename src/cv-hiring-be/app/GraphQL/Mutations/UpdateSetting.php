<?php

namespace App\GraphQL\Mutations;

use App\Models\Setting;
use Exception;
use Illuminate\Support\Facades\Auth;

class UpdateSetting
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $title_web = $args['input']['title_web'];
            $description = isset($args["input"]["description"]) ? $args["input"]["description"] : null;
            $logo_url =  isset($args["input"]["logo_url"]) ? $args["input"]["logo_url"] : null;
            $fb_url =  isset($args["input"]["fb_url"]) ? $args["input"]["fb_url"] : null;
            $youtube_url =  isset($args["input"]["youtube_url"]) ? $args["input"]["youtube_url"] : null;
            $phone_contact =  isset($args["input"]["phone_contact"]) ? $args["input"]["phone_contact"] : null;
            $price_job = isset($args["input"]["price_job"]) ? $args["input"]["price_job"] : null;
            $isAdmin = Auth::user()->isAdmin();
            if ($isAdmin == false) {
                return [
                    'status' => 'ERROR',
                    'message'   => 'Không có quyền cập nhật cài đặt này'
                ];
            }
            // TODO implement the resolver
            $setting = Setting::first();
            $setting->title_web = $title_web;
            $setting->description = $description;
            $setting->logo_url = $logo_url;
            $setting->fb_url = $fb_url;
            $setting->youtube_url = $youtube_url;
            $setting->phone_contact = $phone_contact;
            $setting->price_job = $price_job;

            $setting->save();

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật cài đặt website thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
