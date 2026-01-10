import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/health-records';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
    {
        title: 'Health Records',
        href: index().url,
    },
];

interface HealthRecord {
    id: number;
    animal?: {
        name: string;
    };
    type: string;
    description: string;
    date: string;
    veterinarian?: string;
    cost?: number;
}

interface Props {
    healthRecords: {
        data: HealthRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ healthRecords }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Records" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Health Records</h1>
                        <p className="text-muted-foreground">
                            Manage your health records
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Health Record
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Records List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {healthRecords.data.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {record.type} -{' '}
                                            {record.animal?.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {record.description} • {record.date}{' '}
                                            • ${record.cost || 0}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(record.id).url}>
                                                Ver
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(record.id).url}>
                                                Editar
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
