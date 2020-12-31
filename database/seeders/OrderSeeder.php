<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory()
        ->hasAttached(Product::factory()->count(rand(1,6)) , ['qty' => rand(1,5)])
        ->count(20)
        ->create();
    }
}
