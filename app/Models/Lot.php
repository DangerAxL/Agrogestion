<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lot extends Model
{
    protected $fillable = [
        'name',
        'capacity',
        'description',
        'active',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'active' => 'boolean',
    ];

    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }

    public function feedings(): HasMany
    {
        return $this->hasMany(Feeding::class);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function getAnimalCountAttribute()
    {
        return $this->animals()->where('active', true)->count();
    }

    public function hasCapacityFor($count)
    {
        return $this->capacity === null || ($this->animal_count + $count) <= $this->capacity;
    }
}
