<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::forUser(Auth::id())
            ->with('notifiable')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        $this->authorize('update', $notification);

        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        Notification::forUser(Auth::id())
            ->unread()
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    public function destroy(Notification $notification)
    {
        $this->authorize('delete', $notification);

        $notification->delete();

        return response()->json(['success' => true]);
    }
}
