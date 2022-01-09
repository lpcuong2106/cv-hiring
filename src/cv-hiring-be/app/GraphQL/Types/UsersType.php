<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UsersType extends GraphQLType
{
    protected $attributes = [
        'name' => 'users',
        'description' => 'A type',
        'model' => User::class
    ];

    public function fields(): array
    {
        return [
            'id'    => [
                'type'  => Type::nonNull(Type::int()),
                'description'    => 'id of user'
            ],
            'name'  => [
                'type'   => Type::nonNull(Type::string()),
                'description'    => 'name of user'
            ]
        ];
    }
}
