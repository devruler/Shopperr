<?php

namespace App\Http\Controllers\Api\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Category as CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->trashed){
            return CategoryResource::collection(Category::onlyTrashed()->orderByDesc('created_at')->withCount('products')->paginate(10));
        }else{
            return CategoryResource::collection(Category::orderByDesc('created_at')->withCount('products')->paginate(10));
        }
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
            'name' => 'required|string|max:255',
        ]);

        $category = new Category;
        $category->name = Str::title($request->name);
        $category->slug = Str::slug($request->name);

        $category->save();

        return response(compact('category'), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Category::where('id', $id)->withCount(['products'])->first(), 200);
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

        if($request->restore){
            return Category::onlyTrashed()->where('id', $id)->restore();
        }



        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $categoryToUpdate = Category::findOrFail($id);

        $categoryToUpdate->name = Str::title($request->name);

        $categoryToUpdate->slug = Str::slug($request->name);

        $categoryToUpdate->save();

        return response(['message' => 'Category has been successfully updated!', 'category' => $categoryToUpdate,], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        if($request->force_delete){
            return Category::onlyTrashed()->where('id', $id)->forceDelete();
        }


        $category = Category::findOrFail($id);
        $category->delete();

        return response(compact('category'), 200);
    }
}
