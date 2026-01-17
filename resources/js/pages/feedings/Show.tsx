import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/feedings';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Feedings',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
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
    feeding: Feeding;
}

export default function Mostrar({ feeding }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Feeding: ${feeding.feed_type}`} />
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
                                {feeding.feed_type}
                            </h1>
                            <p className="text-muted-foreground">
                                Feeding details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(feeding.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Feeding Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Animal:</strong>{' '}
                            {feeding.animal?.name || 'N/A'}
                        </div>
                        <div>
                            <strong>Lot:</strong> {feeding.lot?.name || 'N/A'}
                        </div>
                        <div>
                            <strong>Feed Type:</strong> {feeding.feed_type}
                        </div>
                        <div>
                            <strong>Quantity:</strong> {feeding.quantity}{' '}
                            {feeding.unit}
                        </div>
                        <div>
                            <strong>Date:</strong> {feeding.date}
                        </div>
                        <div>
                            <strong>Cost:</strong> ${feeding.cost || 0}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
