<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        // dd($user);
        return view('app.index', compact('user'));
    }

    public function products()
    {
        return view('app.products.index');
    }

    public function showProduct()
    {
        return view('app.products.show');
    }

}
