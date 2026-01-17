import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/health-alerts';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Health Alerts',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
];

interface HealthAlert {
    id: number;
    type: string;
    message: string;
    alert_date: string;
    priority: 'low' | 'medium' | 'high';
    resolved: boolean;
    resolved_at?: string;
    animal?: {
        caravana: string;
        breed?: {
            name: string;
        };
    };
    creator?: {
        name: string;
    };
}

interface Props {
    healthAlert: HealthAlert;
}

export default function Show({ healthAlert }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Alert Details" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Health Alert Details</h1>
                        <p className="text-muted-foreground">
                            View health alert information
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={edit(healthAlert.id).url}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{healthAlert.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Message</h3>
                            <p className="text-muted-foreground">{healthAlert.message}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold">Alert Date</h3>
                                <p className="text-muted-foreground">
                                    {new Date(healthAlert.alert_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Priority</h3>
                                <Badge variant={healthAlert.priority === 'high' ? 'destructive' : healthAlert.priority === 'medium' ? 'default' : 'secondary'}>
                                    {healthAlert.priority}
                                </Badge>
                            </div>
                            <div>
                                <h3 className="font-semibold">Status</h3>
                                <Badge variant={healthAlert.resolved ? 'outline' : 'destructive'}>
                                    {healthAlert.resolved ? 'Resolved' : 'Unresolved'}
                                </Badge>
                            </div>
                            {healthAlert.resolved_at && (
                                <div>
                                    <h3 className="font-semibold">Resolved At</h3>
                                    <p className="text-muted-foreground">
                                        {new Date(healthAlert.resolved_at).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        {healthAlert.animal && (
                            <div>
                                <h3 className="font-semibold">Animal</h3>
                                <p className="text-muted-foreground">
                                    {healthAlert.animal.caravana}
                                    {healthAlert.animal.breed && ` - ${healthAlert.animal.breed.name}`}
                                </p>
                            </div>
                        )}
                        {healthAlert.creator && (
                            <div>
                                <h3 className="font-semibold">Created By</h3>
                                <p className="text-muted-foreground">{healthAlert.creator.name}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}