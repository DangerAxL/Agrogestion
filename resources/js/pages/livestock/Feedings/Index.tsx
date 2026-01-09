import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/feedings';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Feedings',
        href: index().url,
    },
];

interface Feeding {
    id: number;
    animal?: {
        name: string;
    };
    lot?: {
        name: string;
    };
    feed_type: string;
    quantity: number;
    unit: string;
    date: string;
    cost?: number;
}

interface Props {
    feedings: {
        data: Feeding[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ feedings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedings" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Feedings</h1>
                        <p className="text-muted-foreground">
                            Manage your feeding records
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Feeding
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Feedings List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedings.data.map((feeding) => (
                                <div
                                    key={feeding.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {feeding.feed_type} -{' '}
                                            {feeding.quantity} {feeding.unit}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feeding.animal?.name ||
                                                feeding.lot?.name}{' '}
                                            • {feeding.date} • $
                                            {feeding.cost || 0}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(feeding.id).url}>
                                                Ver
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(feeding.id).url}>
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
