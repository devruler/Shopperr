<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Category as CategoryResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image' => $this->image,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'maker' => $this->maker,
            'model' => $this->model,
            'engine' => $this->engine,
            'created_at' => $this->created_at,
            'category' => new CategoryResource($this->category),
        ];
    }
}
