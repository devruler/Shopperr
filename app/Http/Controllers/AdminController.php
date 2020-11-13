<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function index()
    {
        return view('admin.index');
    }


    // public function products()
    // {
    //     return view('admin.products.index');
    // }

    // public function createProducts()
    // {
    //     return view('admin.products.create');
    // }

    // public function editProducts()
    // {
    //     return view('admin.products.edit');
    // }


    // public function reviews(Request $request)
    // {
    //     return view('admin.reviews.index');
    // }


}
