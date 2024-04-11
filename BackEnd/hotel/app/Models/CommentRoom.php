<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CommentRoom extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $table = 'comment_room';
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'room_id',
        'content',
        'user_id',
        'status'
    ];
}
