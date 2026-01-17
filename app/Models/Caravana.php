<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Caravana extends Model
{
    protected $fillable = ['caravana_nro', 'color', 'animal_id'];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }
}
