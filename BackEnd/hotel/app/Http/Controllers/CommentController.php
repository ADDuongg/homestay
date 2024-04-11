<?php

namespace App\Http\Controllers;

use App\Models\CommentBlog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{

    public function index(Request $request)
    {
        $query = DB::table('comment_blog')
            ->join('users', 'users.id', '=', 'comment_blog.user_id')
            ->join('post', 'post.id', '=', 'comment_blog.blog_id')
            ->select('users.name AS fullname', 'users.image_path AS avatar','post.title', 'post.image_path AS room_image', 'comment_blog.content', 'comment_blog.created_at AS time', 'comment_blog.id','comment_blog.status');
        $user_name = $request->query('user_name');
        if ($user_name) {
            $query->where('users.name', 'LIKE', '%' . $user_name . '%');
        }
        $post_title = $request->query('post_title');
        if ($post_title) {
            $query->where('post.title', 'LIKE', '%' . $post_title . '%');
        }


        $content = $request->query('content');
        if ($content) {
            $query->where('comment_blog.content', '=', $content);
        }


        $comment_blog = $query->paginate(3);

        return response()->json([
            'comment_blog' => $comment_blog,
        ]);
    }

    public function getCommentBlog($id)
    {

        $comment_blog = DB::table('comment_blog')
            ->join('users', 'users.id', '=', 'comment_blog.user_id')
            ->where('comment_blog.blog_id', $id)
            ->select('users.*', 'comment_blog.content', 'comment_blog.created_at AS time','comment_blog.status')
            ->get();
        return response()->json([
            'comment_blog' => $comment_blog,
            'id' => $id
        ]);
    }
    public function show($id){
        $comment_blog = CommentBlog::where('id',$id)->first();
        return response()->json([
            'sstatus' => 200,
            'comment_blog' => $comment_blog
        ]);
    }

    public function update(Request $request, $id){
        $comment_blog = CommentBlog::where('id',$id)->first();
        $content = $request->content;
        $status = $request->status;
        $comment_blog->content = $content;
        $comment_blog->status = $status;

        $comment_blog->save();
        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật thông tin thành công'
        ]);
    }
    public function destroy($id){
        $comment_blog = CommentBlog::findOrFail($id);
        $comment_blog->delete();
        return response()->json([
            'status' => 200,
        ]);
    }

    public function storeCommentBlog(Request $request)
    {
        $user_id = $request->user_id;
        $content = $request->comment;
        $blog_id = $request->blog_id;
        $comment_blog = new CommentBlog();
        $comment_blog->user_id = $user_id;
        $comment_blog->content = $content;
        $comment_blog->blog_id = $blog_id;
        $comment_blog->status = 0;
        $comment_blog->save();

        $comment_blog = DB::table('comment_blog')
            ->join('users', 'users.id', '=', 'comment_blog.user_id')
            ->where('comment_blog.blog_id', $blog_id)
            ->select('users.*', 'comment_blog.content', 'comment_blog.created_at AS time')
            ->get();
        return response()->json([
            'status' => 200,
            'message' => 'Bình luận thành công',
            'comment_blog' => $comment_blog
        ]);
    }
}
