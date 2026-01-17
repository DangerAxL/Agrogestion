import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/weighings';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Weighings',
        href: index().url,
    },
];

interface Weighing {
    id: number;
    animal?: {
        name: string;
    };
    weight: number;
    date: string;
    notes?: string;
}

interface Props {
    weighings: {
        data: Weighing[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ weighings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Weighings" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Weighings</h1>
                        <p className="text-muted-foreground">
                            Manage your weighing records
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Weighing
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Weighings List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {weighings.data.map((weighing) => (
                                <div
                                    key={weighing.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {weighing.animal?.name} -{' '}
                                            {weighing.weight} kg
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {weighing.date}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(weighing.id).url}>
                                                Ver
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(weighing.id).url}>
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
