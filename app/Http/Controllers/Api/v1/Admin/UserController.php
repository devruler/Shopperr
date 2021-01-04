<?php

namespace App\Http\Controllers\Api\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\User as ResourcesUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $request->trashed ?
        ResourcesUser::collection(User::onlyTrashed()->where('is_admin', false)->withCount(['orders', 'reviews'])->with(['orders', 'reviews'])->orderByDesc('created_at')->paginate(10))
        :
        ResourcesUser::collection(User::where('is_admin', false)->withCount(['orders', 'reviews'])->with(['orders', 'reviews'])->orderByDesc('created_at')->paginate(10))
        ;
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
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'unique:users',
                'email',
                'max:255',
            ],
            'password' => ['required', 'string', 'max:255', 'min:8', 'confirmed']
        ]);

        $user = new User;

        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->city = $request->city;
        $user->country = $request->country;
        $user->postal_code = $request->postal_code;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);


        $user->save();

        return response(['message' => 'User has been successfully updated!', 'user' => $user], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(User::where('id', $id)->with(['orders' => function($q) {
            $q->limit(5);
        }, 'reviews' => function ($q) {
            $q->limit(5);
        }])->first(), 200);
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
            $user = User::onlyTrashed()->where('id', $id)->restore();
            return response(compact('user'), 200);
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($id),

            ],
        ]);

        $userToUpdate = User::findOrFail($id);

        $userToUpdate->name = $request->name;
        $userToUpdate->phone = $request->phone;
        $userToUpdate->address = $request->address;
        $userToUpdate->city = $request->city;
        $userToUpdate->country = $request->country;
        $userToUpdate->postal_code = $request->postal_code;
        $userToUpdate->email = $request->email;

        $userToUpdate->save();

        return response(['message' => 'User has been successfully updated!', 'user' => $userToUpdate], 200);
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
            $user = User::onlyTrashed()->where('id', $id)->forceDelete();
            return response(compact('user'), 200);
        }

        $user = User::findOrFail($id)->delete();

        return response(compact('user'), 200);

    }

    public function getUserProfile(){
        dd(Auth::check());
    }

}
