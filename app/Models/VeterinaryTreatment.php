<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VeterinaryTreatment extends Model
{
    protected $fillable = [
        'treatment_catalog_id',
        'animal_id',
        'applied_at',
        'dosage',
        'notes',
    ];

    protected $casts = [
        'applied_at' => 'date',
    ];

    public function treatmentCatalog(): BelongsTo
    {
        return $this->belongsTo(TreatmentCatalog::class);
    }

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }
}
