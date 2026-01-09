<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ConfigController extends Controller
{
    /**
     * Display the configuration settings.
     */
    public function index()
    {
        $settings = [
            'farm_name' => config('app.name', 'Feedlot'),
            'default_weight_unit' => 'kg',
            'default_currency' => 'USD',
            'alert_low_stock' => true,
            'auto_backup' => false,
        ];

        return Inertia::render('livestock/Config/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'farm_name' => 'required|string|max:255',
            'default_weight_unit' => 'required|in:kg,lb',
            'default_currency' => 'required|string|max:3',
            'alert_low_stock' => 'boolean',
            'auto_backup' => 'boolean',
        ]);

        // In a real app, save to database or config files
        // For now, just cache them
        foreach ($validated as $key => $value) {
            Cache::put("config.{$key}", $value, now()->addDays(30));
        }

        return redirect()->route('config.index')->with('success', __('Configuration updated successfully.'));
    }
}
