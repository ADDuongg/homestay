<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FacilitiesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoomController;
use App\Models\Facilities;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/getfacilities', [FacilitiesController::class, 'index']);
Route::get('/getroom', [RoomController::class, 'index']);
Route::get('/getcomment', [CommentController::class, 'index']);
Route::get('/post', [PostController::class, 'index']);
Route::get('/getAllpost', [PostController::class, 'getAll']);
Route::get('/csrf-token', [AuthController::class, 'getToken']);
/* Route::get('/getpost', [PostController::class, 'index']); */
