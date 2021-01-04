<?php

namespace App\Http\Controllers\Api\v1\admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of statistics.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStatistics()
    {

        $orders_count = Order::whereBetween('created_at',[Carbon::now()->startOfDay(),Carbon::now()->endOfDay()])->count();
        $customers_count = User::where('is_admin', 0)->whereBetween('created_at',[Carbon::now()->startOfDay(),Carbon::now()->endOfDay()])->count();
        $reviews_count = Review::whereBetween('created_at',[Carbon::now()->startOfDay(),Carbon::now()->endOfDay()])->count();

        $todayRevenue = Order::whereBetween('created_at',[Carbon::now()->startOfDay(),Carbon::now()->endOfDay()])->sum('total');
        $weekRevenue = Order::whereBetween('created_at',[Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])->sum('total');
        $MonthRevenue = Order::whereBetween('created_at',[Carbon::now()->startOfMonth(),Carbon::now()->endOfMonth()])->sum('total');
        $allTimeRevenue = Order::sum('total');

        $statistics = [
            'orders_count' => $orders_count,
            'customers_count' => $customers_count,
            'reviews_count' => $reviews_count,
            'revenue' => [
                'today' => $todayRevenue,
                'week' => $weekRevenue,
                'month' => $MonthRevenue,
                'allTime' => $allTimeRevenue,
            ],
        ];

        return response($statistics, 200);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }
}
