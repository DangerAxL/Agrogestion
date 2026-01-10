<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feeding extends Model
{
    use HasFactory;

    protected $fillable = [
        'lot_id',
        'feed_type_id',
        'date',
        'ration_kg',
        'total_ration',
    ];

    protected $casts = [
        'date' => 'datetime',
        'ration_kg' => 'decimal:2',
        'total_ration' => 'decimal:2',
    ];

    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }

    public function feedType(): BelongsTo
    {
        return $this->belongsTo(FeedType::class);
    }
}
