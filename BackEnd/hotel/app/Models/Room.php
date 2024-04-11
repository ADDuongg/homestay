<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Room extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $table = 'room';
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'floor',
        'type_room',
        'max_number_people',
        /* 'curent_number_people', */
        'rent_cost',
        'image',
        'image_path',
        /* 'start_from',
        'end_at', */
        'status'
    ];

}
