<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeedType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'composition',
    ];

    public function feedings(): HasMany
    {
        return $this->hasMany(Feeding::class);
    }
}
