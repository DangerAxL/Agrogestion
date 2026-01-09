<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Weighing;

class WeighingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view weighings');
    }

    public function view(User $user, Weighing $weighing): bool
    {
        return $user->can('view weighings');
    }

    public function create(User $user): bool
    {
        return $user->can('create weighings');
    }

    public function update(User $user, Weighing $weighing): bool
    {
        return $user->can('edit weighings');
    }

    public function delete(User $user, Weighing $weighing): bool
    {
        return $user->can('delete weighings');
    }
}
