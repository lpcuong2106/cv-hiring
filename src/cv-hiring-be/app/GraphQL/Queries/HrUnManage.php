<?php

namespace App\GraphQL\Queries;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class HrUnManage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $usersHasManageCompany  = DB::table('companies')->whereNotNull('user_id')->select('user_id')->get();
        $listIdExcludeHasManage = [];

        foreach ($usersHasManageCompany as $user) {
            array_push($listIdExcludeHasManage, $user->user_id);
        }

        $users = DB::table('users')->where('role_id', 3)->whereNotIn('id', $listIdExcludeHasManage)->get();
        return $users;
    }
}
