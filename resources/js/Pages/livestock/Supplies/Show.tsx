import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/supplies';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Supplies',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
    },
];

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
    supply: Supply;
}

export default function Mostrar({ supply }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Supply: ${supply.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {supply.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Supply details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(supply.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Supply Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Name:</strong> {supply.name}
                        </div>
                        <div>
                            <strong>Type:</strong> {supply.type}
                        </div>
                        <div>
                            <strong>Quantity:</strong> {supply.quantity}{' '}
                            {supply.unit}
                        </div>
                        <div>
                            <strong>Minimum Stock:</strong> {supply.min_stock}{' '}
                            {supply.unit}
                        </div>
                        <div>
                            <strong>Supplier:</strong>{' '}
                            {supply.supplier || 'N/A'}
                        </div>
                        <div>
                            <strong>Cost per Unit:</strong> $
                            {supply.cost_per_unit}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
