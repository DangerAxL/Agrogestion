<?php

namespace App\Jobs;

use App\Models\Animal;
use App\Models\Notification;
use App\Models\VeterinaryTreatment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CheckUpcomingVaccinationsJob implements ShouldQueue
{
    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $daysAhead = 7;

            VeterinaryTreatment::with(['animal', 'treatmentCatalog'])
                ->where('applied_at', '>', now())
                ->where('applied_at', '<=', now()->addDays($daysAhead))
                ->whereHas('treatmentCatalog', function ($query) {
                    $query->where('name', 'like', '%vacun%');
                })
                ->get()
                ->each(function ($treatment) {
                    Notification::create([
                        'type' => 'upcoming_vaccination',
                        'title' => 'Vacunación próxima',
                        'message' => "Vacunación programada para {$treatment->animal->caravana} el {$treatment->applied_at->format('d/m/Y')}",
                        'data' => ['treatment_id' => $treatment->id],
                        'user_id' => 1,
                        'notifiable_type' => Animal::class,
                        'notifiable_id' => $treatment->animal_id,
                    ]);
                });
        } catch (\Exception $e) {
            Log::error('Error in CheckUpcomingVaccinationsJob', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    public function failed(\Exception $exception)
    {
        Log::critical('CheckUpcomingVaccinationsJob failed', [
            'error' => $exception->getMessage(),
        ]);
    }
}
