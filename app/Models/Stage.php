<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stage extends Model
{
    protected $fillable = ['stage_name', 'animal_id'];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }
}
