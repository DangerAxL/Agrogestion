<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'caravana',
        'breed_id',
        'weight_entry',
        'weight_current',
        'status',
        'lot_id',
        'active',
        'entry_date',
        'withdrawal_date',
    ];

    protected $casts = [
        'weight_entry' => 'decimal:2',
        'weight_current' => 'decimal:2',
        'active' => 'boolean',
        'entry_date' => 'date',
        'withdrawal_date' => 'date',
    ];

    public function breed(): BelongsTo
    {
        return $this->belongsTo(Breed::class);
    }

    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }

    public function weighings(): HasMany
    {
        return $this->hasMany(Weighing::class);
    }

    public function medicalHistories(): HasMany
    {
        return $this->hasMany(MedicalHistory::class);
    }

    public function veterinaryTreatments(): HasMany
    {
        return $this->hasMany(VeterinaryTreatment::class);
    }

    public function healthAlerts(): HasMany
    {
        return $this->hasMany(HealthAlert::class);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function isUnderWithdrawal(): bool
    {
        return $this->withdrawal_date && $this->withdrawal_date > now();
    }
}
