<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FacilitiesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['admin', 'auth:sanctum'])->group(function () {
    Route::resource('/facilities', FacilitiesController::class);
});
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('/post/{id}', [PostController::class, 'show']);
Route::post('/addPost', [PostController::class, 'store']);
Route::put('/updatePost/{id}', [PostController::class, 'update']);
Route::delete('/deletePost/{id}', [PostController::class, 'delete']);
Route::get('/getAllFacilities', [FacilitiesController::class, 'getAllFacilities']);
Route::resource('/room', RoomController::class);
Route::post('/roomfacilities/{id}', [FacilitiesController::class, 'storeRoomFacilities']);
Route::delete('/roomfacilities/{id}', [FacilitiesController::class, 'destroyRoomFacilities']);




Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/addUser', [UserController::class, 'store']);
    Route::put('/updateUser/{id}', [UserController::class, 'update']);
    Route::delete('/deleteUser/{id}', [UserController::class, 'delete']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/comment_blog/{id}', [CommentController::class, 'getCommentBlog']);
    Route::get('/commentBlog', [CommentController::class, 'index']);
    Route::get('/commentBlog/{id}', [CommentController::class, 'show']);
    Route::put('/commentBlog/{id}', [CommentController::class, 'update']);
    Route::post('/comment_blog', [CommentController::class, 'storeCommentBlog']);
    Route::delete('/commentBlog/{id}', [CommentController::class, 'destroy']);
    Route::resource('/reservation', ReservationController::class);
    Route::get('/getAllRoom', [RoomController::class, 'getAllRoom']);
});
