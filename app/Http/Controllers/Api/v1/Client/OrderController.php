<?php

namespace App\Http\Controllers\Api\v1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order as ResourcesOrder;
use App\Models\Order;
use App\Notifications\OrderConfirmed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $newOrder = new Order;
        $newOrder->total = $request->total;
        $newOrder->is_delivered = false;
        $newOrder->is_paid = $request->payment_method === 'Paypal' || $request->payment_method === 'Credit Card' ? True : False;
        $newOrder->user_id = Auth()->id();
        $newOrder->shipping_method = $request->shipping_method;
        $newOrder->payment_method = $request->payment_method;
        $newOrder->uuid = Str::uuid();
        $newOrder->save();

        foreach($request->products as $product){
            $newOrder->products()->attach($product['id'], ['qty' => $product['qty']]);
        }

        $request->user()->notify(new OrderConfirmed($newOrder));

        return response($newOrder, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    }

    public function customerOrders(){
        return ResourcesOrder::collection(Order::where('user_id', Auth::id())->orderByDesc('created_at')->paginate(10));
    }

}
