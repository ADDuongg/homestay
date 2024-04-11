<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class CommentBlog extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $table = 'comment_blog';
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */ 
    protected $fillable = [
        'blog_id',
        'content',
        'user_id',
        'status'
    ];
}
