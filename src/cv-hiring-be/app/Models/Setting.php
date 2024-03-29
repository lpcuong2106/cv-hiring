<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_web',
        'description',
        'logo_url',
        'fb_url',
        'youtube_url',
        'phone_contact',
        'price_job'
    ];
}
