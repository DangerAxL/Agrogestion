<?php

namespace App\Console\Commands;

use App\Jobs\CheckLowWeightJob;
use App\Jobs\CheckSupplyStockJob;
use App\Jobs\CheckUpcomingVaccinationsJob;
use Illuminate\Console\Command;

class CheckAlerts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alerts:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for alerts and create notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dispatching alert check jobs...');

        CheckLowWeightJob::dispatch();
        CheckSupplyStockJob::dispatch();
        CheckUpcomingVaccinationsJob::dispatch();

        $this->info('Alert jobs dispatched successfully.');
    }
}
