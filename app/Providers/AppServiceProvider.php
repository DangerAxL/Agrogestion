<?php

namespace App\Providers;

use App\Models\Animal;
use App\Models\Breed;
use App\Models\Feeding;
use App\Models\FeedType;
use App\Models\Lot;
use App\Models\Supply;
use App\Models\Weighing;
use App\Policies\AnimalPolicy;
use App\Policies\BreedPolicy;
use App\Policies\FeedingPolicy;
use App\Policies\FeedTypePolicy;
use App\Policies\LotPolicy;
use App\Policies\SupplyPolicy;
use App\Policies\WeighingPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(125);

        Gate::policy(Animal::class, AnimalPolicy::class);
        Gate::policy(Lot::class, LotPolicy::class);
        Gate::policy(Breed::class, BreedPolicy::class);
        Gate::policy(Weighing::class, WeighingPolicy::class);
        Gate::policy(Supply::class, SupplyPolicy::class);
        Gate::policy(FeedType::class, FeedTypePolicy::class);
        Gate::policy(Feeding::class, FeedingPolicy::class);
    }
}
