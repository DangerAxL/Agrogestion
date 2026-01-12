<?php

namespace App\Jobs;

use App\Models\Notification;
use App\Models\Supply;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CheckSupplyStockJob implements ShouldQueue
{
    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Supply::whereRaw('stock_current <= min_stock')
                ->get()
                ->each(function ($supply) {
                    Notification::create([
                        'type' => 'low_stock',
                        'title' => 'Stock bajo',
                        'message' => "El suministro {$supply->name} está por agotarse ({$supply->stock_current} {$supply->unit})",
                        'data' => ['supply_id' => $supply->id],
                        'user_id' => 1,
                        'notifiable_type' => Supply::class,
                        'notifiable_id' => $supply->id,
                    ]);
                });
        } catch (\Exception $e) {
            Log::error('Error in CheckSupplyStockJob', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    public function failed(\Exception $exception)
    {
        Log::critical('CheckSupplyStockJob failed', [
            'error' => $exception->getMessage(),
        ]);
    }
}
