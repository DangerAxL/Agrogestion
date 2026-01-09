<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HealthRecord extends Model
{
    protected $fillable = [
        'animal_id',
        'disease',
        'treatment',
        'date',
        'veterinarian_id',
        'withdrawal_days',
        'release_date',
        'observations',
    ];

    protected $casts = [
        'date' => 'date',
        'release_date' => 'date',
        'withdrawal_days' => 'integer',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function veterinarian(): BelongsTo
    {
        return $this->belongsTo(User::class, 'veterinarian_id');
    }
}
