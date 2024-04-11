<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $userQuery = Post::query();
        $title = $request->query('title');
        $status = $request->query('status');
        if (isset($title)) {
            $userQuery = $userQuery->where('title', 'like', '%' . $title . '%');
        }
        if (isset($status)) {
            $userQuery = $userQuery->where('status', 'like', '%' . $status . '%');
        }
        // Tạo query cho phân trang
        $limit = $request->query('limit', 3); // Giới hạn mặc định là 5 nếu không có giới hạn được truyền vào
        $posts = $userQuery->paginate($limit);

        return response()->json([
            'posts' => $posts
        ]);
    }
    public function getAll(){
        $posts = Post::all();
        return response()->json([
            'posts' => $posts
        ]);
    }
    public function show($id)
    {
        $posts = Post::where('id', $id)->first();
        if (!$posts) {
            return response()->json([
                'message' => 'Không tìm thấy bài đăng'
            ]);
        }
        return response()->json([
            'posts' => $posts
        ]);
    }
    public function store(Request $request)
    {
        /*  dd($request->image); */
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->status = $request->status;
        $post->image = '';
        $post->image_path = '';
        $image = $request->image;
        if ($image) {
            $file = $request->file('image');
            $filename = 'file' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $filename);
            $post->image = $filename;
            $post->image_path = 'storage/images/' . $filename;
        }
        $post->save();
        return response()->json([
            'status' => 200,
            'message' => 'Thêm bài đăng thành công'
        ]);
    }

    public function update(Request $request, string $id)
    {
        $post = Post::where('id', $id)->first(); 
        if (!$post) {
            return response()->json([
                'message' => 'Không tìm thấy bài đăng'
            ], 404);
        }


        $post->title = $request->title;
        $post->content = $request->content;
        $post->status = $request->status;


        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'file' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $filename);

            if ($post->image) {
                Storage::delete('public/images/' . $post->image);
            }
            $post->image = $filename;
            $post->image_path = 'storage/images/' . $filename;
        }
        $post->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật bài đăng thành công'
        ]);
    }





    public function delete($id)
    {
        $post = Post::where('id', $id)->first();
        $image = $post->image;
        if ($image) {
            Storage::delete('public/images/' . $image);
        }
        $post->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa bài đăng thành công'
        ]);
    }
}
