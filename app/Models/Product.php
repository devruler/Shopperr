<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'price' => 'float'
    ];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }

    public function orders(){
        return $this->belongsToMany('App\Models\Order');
    }

    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    public function reviews(){
        return $this->hasMany('App\Models\Review');
    }
}
