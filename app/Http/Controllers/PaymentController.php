<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PaymentController extends Controller
{

    public function makePayment(Request $request){


        $order = new Order;

        $order->total = $request->total;
        $order->user_id = $request->user()->id;
        $order->save();

        $order->products()->sync(Arr::pluck($request->cart,'id'));


        $data = [];
        $data['cart'] = [
            $request->cart
        ];

        $data['invoice_id'] = $order->id;
        $data['invoice_description'] = "Order #{$data['id']} Invoice";
        // $data['return_url'] = route('payment.success');
        // $data['cancel_url'] = route('payment.cancel');
        $data['total'] = $order->total * 100;

    }

}
