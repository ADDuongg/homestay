<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Reservation extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $table = 'reservation';
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'room_id',
        'user_id',
        'note',
        'fullname',
        'number',
        'start_from',
        'end_at',
        'adult',
        'children',
        'status'

    ];
}
