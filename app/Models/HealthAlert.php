<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HealthAlert extends Model
{
    /** @use HasFactory<\Database\Factories\HealthAlertFactory> */
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'type',
        'message',
        'alert_date',
        'priority',
        'resolved',
        'resolved_at',
        'created_by',
    ];

    protected $casts = [
        'alert_date' => 'date',
        'resolved' => 'boolean',
        'resolved_at' => 'datetime',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeUnresolved($query)
    {
        return $query->where('resolved', false);
    }

    public function scopeByPriority($query, string $priority)
    {
        return $query->where('priority', $priority);
    }
}
