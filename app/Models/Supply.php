<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supply extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'stock_current',
        'unit',
        'min_stock',
    ];

    protected $casts = [
        'stock_current' => 'decimal:2',
        'min_stock' => 'decimal:2',
    ];
}
