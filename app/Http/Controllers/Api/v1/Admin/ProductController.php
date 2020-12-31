<?php

namespace App\Http\Controllers\Api\v1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(Product::orderByDesc('created_at')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:5|max:80',
            'description' => 'required|string',
            'img' => 'required|image|mimes:jpg,png,jpeg',
            'price' => 'required|numeric',
            'maker' => 'required|string',
            'model' => 'required|string',
            'engine' => 'nullable|string',
            'category_id' => 'required|integer',
        ]);

        $product = new Product;
        $product->title = $request->title;
        $product->slug = Str::slug($request->title);
        $product->description = $request->description;
        $product->maker = $request->maker;
        $product->model = $request->model;
        $product->engine = $request->engine;
        $product->price = $request->price;
        $product->category_id = $request->category_id;

        // Image upload
        if($request->hasFile('img')){
            $product->image = $this->saveImage($request->img);
        }

        $product->save();

        return response(compact('product'), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new ProductResource(Product::findOrFail($id));
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
        $request->validate([
            'title' => 'required|string|min:5|max:80',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'maker' => 'required|string',
            'model' => 'required|string',
            'engine' => 'nullable|string',
            'category_id' => 'required|integer',
        ]);

        $product = Product::findOrFail($id);
        $product->title = $request->title;
        $product->slug = Str::slug($request->title);
        $product->description = $request->description;
        $product->maker = $request->maker;
        $product->model = $request->model;
        $product->engine = $request->engine;
        $product->price = $request->price;
        $product->category_id = $request->category_id;

        // Update image
        if($request->hasFile('image')){

            $request->validate([
                'image' => 'image|image|mimes:png,jpg,jpeg'
            ]);

            if(File::exists(public_path("images/products/".$product->image))){
                if(File::delete(public_path("images/products/".$product->image))){
                    $product->image = $this->saveImage($request->image);
                }
            }else{
                $product->image = $this->saveImage($request->image);
            }


        }

        $product->save();

        return response(compact('product'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        File::delete(public_path("images/products/".$product->image));
        $product->delete();
        return response(['message' => 'Product Has been succesfully deleted!'], 200);
    }

    protected function saveImage($img) {
        $ext = $img->extension();
        $imgName = Str::random(10) . '.' . $ext;
        $img->move(public_path('images/products'), $imgName);
        return $imgName;
    }
}
