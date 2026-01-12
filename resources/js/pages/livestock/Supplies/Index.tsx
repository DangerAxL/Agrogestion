import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/supplies';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Supplies',
        href: index().url,
    },
];

console.log('Supplies Index breadcrumbs:', breadcrumbs);

interface Supply {
    id: number;
    name: string;
    type: string;
    quantity: number;
    unit: string;
    min_stock: number;
    supplier?: string;
    cost_per_unit: number;
}

interface Props {
    supplies: {
        data: Supply[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ supplies }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Supplies" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Supplies</h1>
                        <p className="text-muted-foreground">
                            Manage your livestock supplies
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Supply
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Supplies List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {supplies.data.map((supply) => (
                                <div
                                    key={supply.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {supply.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {supply.type} • {supply.quantity}{' '}
                                            {supply.unit} • $
                                            {supply.cost_per_unit}/unit
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(supply.id).url}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(supply.id).url}>
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
