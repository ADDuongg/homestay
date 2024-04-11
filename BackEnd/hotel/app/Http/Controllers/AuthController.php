<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email:191',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            } else {
                if ($user->role === 'admin') {
                    $role_response = 'admin';
                    $token = $user->createToken('_AdminToken')->plainTextToken;
                } else {
                    $role_response = 'user';
                    $token = $user->createToken('_Token')->plainTextToken;
                }
                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Logged In Successfully',
                    'role' => $role_response,
                    'user' => $user
                ]);
            }
        }
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email:191|unique:users,email',
            'password' => 'required',
            'number' => 'required',
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
                'number' => $request->number,
                'role' => 'user',
                'image' => '',
                'image_path' => '',
            ]);

            $token = $user->createToken('_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);
        }
    }

    public function logout(Request $request)
    {
        if (auth()->check()) {
            /*  auth()->user()->tokens()->where('tokenable_type', auth()->user()->getMorphClass())->delete(); */
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully', 'status' => 200]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function getToken(){
        return response()->json(['csrf' => csrf_token()]);
    }
}
