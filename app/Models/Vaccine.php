<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'laboratory',
        'withdrawal_days',
    ];

    protected $casts = [
        'withdrawal_days' => 'integer',
    ];
}
