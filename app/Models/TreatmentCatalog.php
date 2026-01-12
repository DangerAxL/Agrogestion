<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TreatmentCatalog extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function veterinaryTreatments(): HasMany
    {
        return $this->hasMany(VeterinaryTreatment::class);
    }
}
