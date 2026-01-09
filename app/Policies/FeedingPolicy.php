<?php

namespace App\Policies;

use App\Models\Feeding;
use App\Models\User;

class FeedingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view feedings');
    }

    public function view(User $user, Feeding $feeding): bool
    {
        return $user->can('view feedings');
    }

    public function create(User $user): bool
    {
        return $user->can('create feedings');
    }

    public function update(User $user, Feeding $feeding): bool
    {
        return $user->can('edit feedings');
    }

    public function delete(User $user, Feeding $feeding): bool
    {
        return $user->can('delete feedings');
    }
}
