<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'is_paid' => 'boolean',
        'is_delivered' => 'boolean'
    ];

    public function products(){
        return $this->belongsToMany('App\Models\Product');
    }

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
