<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'type',
        'description',
        'date',
        'veterinarian_id',
        'cost',
        'withdrawal_days',
        'release_date',
        'observations',
    ];

    protected $casts = [
        'date' => 'date',
        'release_date' => 'date',
        'cost' => 'decimal:2',
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
