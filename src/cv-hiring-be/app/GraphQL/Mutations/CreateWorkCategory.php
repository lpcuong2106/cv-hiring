<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkCategory;
use Exception;

class CreateWorkCategory
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $name = isset($args["name"]) ? $args["name"] : null;
            WorkCategory::create(['name' => $name]);

            return [
                'status' => 'OK',
                'message'   => 'Tạo ngành nghề thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
