<?php

use App\Http\Controllers\Api\v1\Admin\ProductController as AdminProduct;
use App\Http\Controllers\Api\v1\Admin\CategoryController as AdminCategory;
use App\Http\Controllers\Api\v1\Admin\UserController as AdminUser;
use App\Http\Controllers\Api\v1\Admin\OrderController as AdminOrder;
use App\Http\Controllers\Api\v1\Admin\ReviewController as AdminReview;

use App\Http\Controllers\Api\v1\Client\ProductController as ClientProduct;
use App\Http\Controllers\Api\v1\Client\CategoryController as ClientCategory;
use App\Http\Controllers\Api\v1\Client\UserController as ClientUser;
use App\Http\Controllers\Api\v1\Client\OrderController as ClientOrder;
use App\Http\Controllers\Api\v1\Client\ReviewController as ClientReview;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Requires valid authentication
Route::group(['middleware' => 'auth:api'], function () {

    // must be from an authorized Admin
    Route::group(['prefix' => 'admin', 'middleware' => 'is.admin'], function () {
        Route::apiResource('products', AdminProduct::class);
        Route::apiResource('orders', AdminOrder::class);
        Route::apiResource('categories', AdminCategory::class);
        Route::apiResource('customers', AdminUser::class);
        Route::apiResource('reviews', AdminReview::class);
    });

    Route::group(['prefix' => 'customer'], function () {
        Route::get('orders', [ClientOrder::class, 'customerOrders']);
        Route::get('reviews', [ClientReview::class, 'customerReviews']);
        Route::post('reviews', [ClientReview::class, 'store']);
    });

});

// No authentication required

// Makers & Models & Engines
Route::get('/products/makers' , [ClientProduct::class, 'productsMakers']);
Route::get('/products/models' , [ClientProduct::class, 'productsModels']);
Route::get('/products/engines' , [ClientProduct::class, 'productsEngines']);

// Products
Route::get('products/search_ids', [ClientProduct::class, 'searchByIds']);
Route::apiResource('/products', ClientProduct::class)->only(['index', 'show']);
Route::apiResource('/categories', ClientCategory::class)->only(['index', 'show']);
Route::apiResource('/reviews', ClientReview::class)->only(['index', 'show']);


