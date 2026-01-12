import { useEffect, useState } from 'react';

declare global {
    interface Window {
        Pusher: any;
        Echo: any;
    }
}

export function useNotifications(userId: number) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Inicializar Echo si no está inicializado
        if (!window.Echo) {
            window.Pusher = require('pusher-js');
            window.Echo = require('laravel-echo').default;
            window.Echo = new window.Echo({
                broadcaster: 'pusher',
                key: import.meta.env.VITE_PUSHER_APP_KEY,
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                encrypted: true,
            });
        }

        const channel = window.Echo.private(`notifications.${userId}`)
            .listen('.notification.created', (e: any) => {
                setNotifications(prev => [e.notification, ...prev]);
                setUnreadCount(prev => prev + 1);
            });

        return () => {
            window.Echo.leave(`notifications.${userId}`);
        };
    }, [userId]);

    return { notifications, unreadCount };
}