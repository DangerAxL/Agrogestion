<?php

namespace App\Models;

use App\Events\NotificationCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'message',
        'data',
        'read_at',
        'user_id',
        'notifiable_type',
        'notifiable_id',
    ];

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function isRead(): bool
    {
        return ! is_null($this->read_at);
    }

    public function markAsRead(): bool
    {
        return $this->update(['read_at' => now()]);
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($notification) {
            broadcast(new NotificationCreated($notification));
        });
    }
}
