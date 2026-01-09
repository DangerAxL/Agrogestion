<?php

namespace App\Policies;

use App\Models\Breed;
use App\Models\User;

class BreedPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view breeds');
    }

    public function view(User $user, Breed $breed): bool
    {
        return $user->can('view breeds');
    }

    public function create(User $user): bool
    {
        return $user->can('create breeds');
    }

    public function update(User $user, Breed $breed): bool
    {
        return $user->can('edit breeds');
    }

    public function delete(User $user, Breed $breed): bool
    {
        return $user->can('delete breeds');
    }
}
