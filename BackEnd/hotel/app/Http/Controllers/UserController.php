<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $userQuery = User::query();
        $name = $request->query('name');
        $role = $request->query('role');

        if (isset($name)) {
            $userQuery = $userQuery->where('name', 'like', '%' . $name . '%');
        }
        if (isset($role)) {
            $userQuery = $userQuery->where('role', 'like', '%' . $role . '%');
        }

        // Tạo query cho phân trang
        $limit = $request->query('limit', 3); // Giới hạn mặc định là 5 nếu không có giới hạn được truyền vào
        $users = $userQuery->paginate($limit);

        return response()->json([
            'users' => $users
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email:191|unique:users,email',
            'password' => 'required',
        ]);
        $data_user = User::where('email', $request->email)->first();
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        if ($data_user && $data_user->email === $request->email) {
            return response()->json([
                'message' => 'Email này đã được đăng kí'
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
                'image' => '',
                'image_path' => ''
            ]);
            $image = $request->image;
            if ($image) {
                $file = $request->image;
                $filename = 'avatar' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/images', $filename);
                $user->image = $filename;
                $user->image_path = 'storage/images/' . $filename;
            }
            $user->save();
            /* $token = $user->createToken('_Token')->plainTextToken; */

            return response()->json([
                'status' => 200,
                'message' => 'Thêm mới người dùng thành công',
            ]);
        }
    }
    public function show($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy user'
            ]);
        }
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }


    public function update(Request $request, string $id)
    {
        $user = User::where('id', $id)->first();
        $new_password = $request->new_password;
        $name = $request->name;
        $email = $request->email;
        $role = $request->role;
        $number = $request->number;
        $image = $request->image;
        if (!$new_password) {
            $user->name = $name;
            $user->email = $email;
            $user->number = $number;
            $user->role = $role;
            if ($image) {
                Storage::delete('public/images/' . $user->image);
                $file = $image;
                $filename = 'avatar' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/images', $filename);
                $user->image = $filename;
                $user->image_path = 'storage/images/' . $filename;
            }
            $user->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cập nhật thông tin user thành công'
            ]);
        } else {
            $user_old_password = $request->old_password;
            if (!Hash::check($user_old_password, $user->password)) { 
                return response()->json([
                    'status' => 400,
                    'message' => 'Mật khẩu cũ không đúng'
                ]);
            }
            $user->password = Hash::make($new_password);
            $user->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cập nhật thông tin mật khẩu thành công'
            ]);
        }
    }

    public function delete($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy user'
            ]);
        }
        $old_image = $user->image;
        if ($old_image) {
            Storage::delete('piblic/images/' . $old_image);
        }
        $user->delete();
        $users = User::paginate(3);
        return response()->json([
            'status' => 200,
            'message' => 'Xóa người dùng thành công',
            'users' => $users
        ]);
    }
}
