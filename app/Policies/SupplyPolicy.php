<?php

namespace App\Policies;

use App\Models\Supply;
use App\Models\User;

class SupplyPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view supplies');
    }

    public function view(User $user, Supply $supply): bool
    {
        return $user->can('view supplies');
    }

    public function create(User $user): bool
    {
        return $user->can('create supplies');
    }

    public function update(User $user, Supply $supply): bool
    {
        return $user->can('edit supplies');
    }

    public function delete(User $user, Supply $supply): bool
    {
        return $user->can('delete supplies');
    }
}
