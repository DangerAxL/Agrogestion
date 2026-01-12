<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * Show the user's two-factor authentication settings page.
     */
    public function show(TwoFactorAuthenticationRequest $request): Response|RedirectResponse
    {
        // Only call ensureStateIsValid if session is available
        if ($request->hasSession()) {
            $request->ensureStateIsValid();
        }

        // Check if password confirmation is required
        if (\Laravel\Fortify\Features::optionEnabled(\Laravel\Fortify\Features::twoFactorAuthentication(), 'confirmPassword')) {
            if (! $request->session()->has('auth.password_confirmed_at')) {
                return redirect()->route('password.confirm');
            }
        }

        return Inertia::render('settings/two-factor', [
            'twoFactorEnabled' => $request->user()->hasEnabledTwoFactorAuthentication(),
            'requiresConfirmation' => \Laravel\Fortify\Features::optionEnabled(\Laravel\Fortify\Features::twoFactorAuthentication(), 'confirmPassword'),
        ]);
    }
}
