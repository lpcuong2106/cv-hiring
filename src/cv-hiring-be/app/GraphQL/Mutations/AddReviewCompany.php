<?php

namespace App\GraphQL\Mutations;

use App\Models\Company;
use App\Models\User;
use Exception;

class AddReviewCompany
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $companyId = isset($args["companyId"]) ? $args["companyId"] : null;
            $userId = isset($args["userId"]) ? $args["userId"] : null;
            $review = isset($args["review"]) ? $args["review"] : null;
            $rating = isset($args["rating"]) ? $args["rating"] : null;

            $company = Company::find($companyId);
            $user = User::find($userId);
            $company->review($review, $user, $rating);
            return [
                'status' => 'OK',
                'message'   => 'Đăng bình luận thành công!'
            ];
        } catch (Exception $e) {
            return [
                'status' => 'ERROR',
                'message'   => $e->getMessage()
            ];
        }
    }
}
