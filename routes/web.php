<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// get the authenticated user
Route::get('auth-user', [UserController::class, 'getAuthenticatedUser']);

Route::get('/', function () {
    return view('app.index', ['user' => Auth::user()]);
});

Route::get('/products', function () {
    return view('app.products.index', ['user' => Auth::user()]);
});

// Product details
Route::get('/products/{id:slug}', function () {
    return view('app.products.show');
});

// Administration area
Route::group(['prefix' => 'admin', 'middleware' => ['auth','is.admin']], function () {
    Route::get('/{any?}', [AdminController::class, 'index'])->where('any', '.*');;
});

// Customer area
Route::group(['prefix' => 'customer', 'middleware' => 'auth'], function () {
    Route::get('/dashboard', function () {
        return view('app.customer.index');
    });
});

// Cart
Route::get('/cart', function() {
    return view('app.cart');
});
