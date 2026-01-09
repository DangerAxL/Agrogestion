<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Weighing extends Model
{
    protected $fillable = [
        'animal_id',
        'date',
        'weight',
        'daily_gain',
        'created_by',
    ];

    protected $casts = [
        'date' => 'date',
        'weight' => 'decimal:2',
        'daily_gain' => 'decimal:3',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
