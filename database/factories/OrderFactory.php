<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;
    protected $usersId;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => Str::uuid(),
            'total' => $this->faker->randomFloat(2,10, 1000),
            'is_delivered' => $this->faker->randomElement([0,1]),
            'is_paid' => $this->faker->randomElement([0,1]),
            'user_id' => $this->faker->randomElement(User::pluck('id')),
            'shipping_method' => $this->faker->randomElement(['Standard Shipping']),
            'payment_method' => $this->faker->randomElement(['Paypal']),
        ];
    }
}
