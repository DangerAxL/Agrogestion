import { useNotifications } from '@/hooks/useNotifications';
import { router } from '@inertiajs/react';
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
    userId: number;
}

export default function NotificationDropdown({ userId }: NotificationDropdownProps) {
    const { notifications, unreadCount } = useNotifications(userId);

    const markAsRead = (notificationId: number) => {
        router.patch(`/notifications/${notificationId}/read`);
    };

    return (
        <div className="relative">
            <button className="relative p-2 rounded-md hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border">
                <div className="p-3 border-b">
                    <h3 className="font-semibold">Notificaciones</h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-3 text-center text-gray-500">
                            No hay notificaciones
                        </div>
                    ) : (
                        notifications.slice(0, 10).map((notification: any) => (
                            <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                                <h4 className="font-semibold text-sm">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">
                                        {new Date(notification.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-xs text-blue-500 hover:text-blue-700"
                                    >
                                        Marcar como leída
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {notifications.length > 0 && (
                    <div className="p-3 border-t">
                        <a href="/notifications" className="text-sm text-blue-500 hover:text-blue-700">
                            Ver todas las notificaciones
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}