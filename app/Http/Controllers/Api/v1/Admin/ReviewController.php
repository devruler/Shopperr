<?php

namespace App\Http\Controllers\Api\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Review as ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->trashed){
            return ReviewResource::collection(Review::onlyTrashed()->with(['product','user'])->orderByDesc('created_at')->paginate(10));
        }else{
            return ReviewResource::collection(Review::with(['product','user'])->orderByDesc('created_at')->paginate(10));
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Review::where('id',$id)->with(['product', 'user'])->first(), 200);
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
            $review = Review::onlyTrashed()->where('id', $id)->restore();
            return response(compact('review'), 200);
        }

        $request->validate([
            'comment' => 'required|string',
        ]);

        $reviewToUpdate = Review::findOrFail($id);
        $reviewToUpdate->comment = $request->comment;

        $reviewToUpdate->save();

        return response(['message' => 'Review has been successfully updated!'], 200);
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
            $review = Review::onlyTrashed()->where('id', $id)->forceDelete();
            return response(compact('review'), 200);
        }

        $review = Review::findOrFail($id);

        $review->delete();

        return response(['message' => 'Review has been successfully deleted'], 200);
    }

    public function customerReviews(){
        return ReviewResource::collection(Review::where('user_id', Auth::user()->id)->orderByDesc('created_at')->get());
    }
}
