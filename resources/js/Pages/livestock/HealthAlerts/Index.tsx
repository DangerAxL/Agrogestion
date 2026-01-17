import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/health-alerts';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Health Alerts',
        href: index().url,
    },
];

interface HealthAlert {
    id: number;
    type: string;
    message: string;
    alert_date: string;
    priority: 'low' | 'medium' | 'high';
    resolved: boolean;
    animal?: {
        caravana: string;
    };
}

interface Props {
    healthAlerts: {
        data: HealthAlert[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ healthAlerts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Alerts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Health Alerts</h1>
                        <p className="text-muted-foreground">
                            Manage health alerts for your livestock
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Health Alert
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Alerts List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {healthAlerts.data.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {alert.type}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {alert.message}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'}>
                                                {alert.priority}
                                            </Badge>
                                            <Badge variant={alert.resolved ? 'outline' : 'destructive'}>
                                                {alert.resolved ? 'Resolved' : 'Unresolved'}
                                            </Badge>
                                            {alert.animal && (
                                                <Badge variant="outline">
                                                    {alert.animal.caravana}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Alert Date: {new Date(alert.alert_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(alert.id).url}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(alert.id).url}>
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}