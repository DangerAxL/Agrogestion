<?php

namespace App\Jobs;

use App\Models\Animal;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CheckLowWeightJob implements ShouldQueue
{
    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $threshold = 0.8; // 80% del peso de entrada

            Animal::active()
                ->whereRaw('weight_current < weight_entry * ?', [$threshold])
                ->get()
                ->each(function ($animal) {
                    Notification::create([
                        'type' => 'low_weight',
                        'title' => 'Peso bajo detectado',
                        'message' => "El animal {$animal->caravana} tiene un peso bajo ({$animal->weight_current}kg)",
                        'data' => ['animal_id' => $animal->id],
                        'user_id' => 1, // Admin o veterinario
                        'notifiable_type' => Animal::class,
                        'notifiable_id' => $animal->id,
                    ]);
                });
        } catch (\Exception $e) {
            Log::error('Error in CheckLowWeightJob', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    public function failed(\Exception $exception)
    {
        Log::critical('CheckLowWeightJob failed', [
            'error' => $exception->getMessage(),
        ]);
    }
}
