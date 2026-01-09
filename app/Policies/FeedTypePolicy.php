<?php

namespace App\Policies;

use App\Models\FeedType;
use App\Models\User;

class FeedTypePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view feed types');
    }

    public function view(User $user, FeedType $feedType): bool
    {
        return $user->can('view feed types');
    }

    public function create(User $user): bool
    {
        return $user->can('create feed types');
    }

    public function update(User $user, FeedType $feedType): bool
    {
        return $user->can('edit feed types');
    }

    public function delete(User $user, FeedType $feedType): bool
    {
        return $user->can('delete feed types');
    }
}
