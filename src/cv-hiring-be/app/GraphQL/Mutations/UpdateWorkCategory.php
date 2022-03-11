<?php

namespace App\GraphQL\Mutations;

use App\Models\WorkCategory;
use Exception;

class UpdateWorkCategory
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $id = isset($args["id"]) ? $args["id"] : null;
            $name = isset($args["name"]) ? $args["name"] : null;
            $workCategory = WorkCategory::findOrFail($id);

            if (isset($workCategory)) {
                $workCategory->name = $name;
                $workCategory->save();
            }

            return [
                'status' => 'OK',
                'message'   => 'Cập nhật ngành nghề thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
