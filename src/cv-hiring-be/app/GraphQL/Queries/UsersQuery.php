<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\User;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\SelectFields;

class UsersQuery extends Query
{
    protected $attributes = [
        'name' => 'users',
        'description' => 'A query'
    ];

    public function type(): Type
    {
        return Type::nonNull(Type::listOf(Type::nonNull(GraphQL::type('users'))));
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id', 
                'type' => Type::int(),
            ],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        /** @var SelectFields $fields */
        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        $where = function ($query) use ($args) {
            if (isset($args['id'])) {
                $query->where('id',$args['id']);
            }
            
            // if (isset($args['email'])) {
            //     $query->where('email',$args['email']);
            // }
        };
        
        $user = User::with(array_keys($with))
            ->where($where)
            ->select($select)
            ->paginate();
            
        return $user;
    }
}
