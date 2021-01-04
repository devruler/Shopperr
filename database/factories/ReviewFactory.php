<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'comment' => $this->faker->sentence(),
            // 'user_id' => $this->faker->randomElement(User::pluck('id')),
            'user_id' => 2,
            'product_id' => $this->faker->randomElement(Product::pluck('id')),

        ];
    }
}
