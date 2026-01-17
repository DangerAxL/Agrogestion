<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VeterinaryTreatment extends Model
{
    protected $fillable = [
        'treatment_name',
        'animal_id',
        'applied_at',
        'dosage',
        'notes',
    ];

    protected $casts = [
        'applied_at' => 'date',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }
}
