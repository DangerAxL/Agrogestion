<?php

namespace App\Policies;

use App\Models\Lot;
use App\Models\User;

class LotPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view lots');
    }

    public function view(User $user, Lot $lot): bool
    {
        return $user->can('view lots');
    }

    public function create(User $user): bool
    {
        return $user->can('create lots');
    }

    public function update(User $user, Lot $lot): bool
    {
        return $user->can('edit lots');
    }

    public function delete(User $user, Lot $lot): bool
    {
        return $user->can('delete lots');
    }
}
