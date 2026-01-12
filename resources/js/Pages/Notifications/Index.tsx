import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    read_at: string | null;
    created_at: string;
    notifiable: { name?: string; caravana?: string; } | null;
}

interface NotificationsIndexProps {
    notifications: {
        data: Notification[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ notifications }: NotificationsIndexProps) {
    const markAsRead = (notificationId: number) => {
        router.patch(`/notifications/${notificationId}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Refresh the page data
                router.reload();
            }
        });
    };

    const markAllAsRead = () => {
        router.patch('/notifications/mark-all-read', {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            }
        });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'low_weight':
                return 'bg-red-100 text-red-800';
            case 'low_stock':
                return 'bg-yellow-100 text-yellow-800';
            case 'upcoming_vaccination':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Notificaciones" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Notificaciones</h1>
                        <p className="text-muted-foreground">
                            Gestiona tus notificaciones del sistema
                        </p>
                    </div>

                    {notifications.data.some(n => !n.read_at) && (
                        <Button onClick={markAllAsRead}>
                            Marcar todas como leídas
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {notifications.data.length === 0 ? (
                        <Card>
                            <CardContent className="flex items-center justify-center py-8">
                                <p className="text-muted-foreground">No hay notificaciones</p>
                            </CardContent>
                        </Card>
                    ) : (
                        notifications.data.map((notification) => (
                            <Card key={notification.id} className={notification.read_at ? 'opacity-75' : ''}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{notification.title}</CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getTypeColor(notification.type)}>
                                                    {notification.type.replace('_', ' ')}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(notification.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        {!notification.read_at && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                Marcar como leída
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground">{notification.message}</p>

                                    {notification.notifiable && (
                                        <div className="mt-3 p-3 bg-muted rounded-md">
                                            <p className="text-sm">
                                                <strong>Relacionado:</strong> {notification.notifiable?.name || notification.notifiable?.caravana || 'Elemento del sistema'}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {notifications.last_page > 1 && (
                    <div className="flex justify-center">
                        {/* Pagination component would go here */}
                        <p className="text-sm text-muted-foreground">
                            Página {notifications.current_page} de {notifications.last_page}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}