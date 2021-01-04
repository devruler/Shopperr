<?php

namespace App\Http\Controllers\Api\v1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product as ResourceProduct;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->hasAny(['category', 'maker', 'model', 'engine'])){
            return ResourceProduct::collection(Product::where('maker', 'like', '%' . $request->maker . '%')
            ->where('model','like', '%' . $request->model . '%')
            ->where(function ($q) use ($request) {
                $q->where('engine','like', '%' . $request->engine . '%')
                ->orWhereNull('engine');
            })
            ->whereHas('category', function ($q) use ($request) {
                $q->where('name','like', '%' . $request->category . '%');
            })
            ->with('category')
            ->orderByDesc('created_at')
            ->paginate(8));
        }

        return ResourceProduct::collection(Product::with('category')->orderByDesc('created_at')->paginate(12));
    }

    public function searchByIds(Request $request){
        // dd($request->ids);
        $listOfIds = explode(',',$request->ids);
        return ResourceProduct::collection(Product::whereIn('id', $listOfIds)->with('category')->orderByDesc('created_at')->get());
    }

    public function searchByName(Request $request){
        $search_query = $request->name;

        if(strlen($search_query)){
            return ResourceProduct::collection(Product::where('title', 'LIKE', '%' . $search_query . '%')->limit(6)->get());
        }

        return response(['data' => []],200);
    }

    public function productsMakers(){
        return response(['data' => Product::all()->pluck('maker')]);
    }

    public function productsModels(){
        return response(['data' => Product::all()->pluck('model')]);
    }

    public function productsEngines(){
        return response(['data' => Product::all()->pluck('engine')]);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        return new ResourceProduct(Product::where('slug', $slug)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
