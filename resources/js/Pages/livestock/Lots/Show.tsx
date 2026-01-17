import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/lots';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Lots',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
    },
];

interface Lot {
    id: number;
    name: string;
    description?: string;
    capacity?: number;
    location?: string;
}

interface Props {
    lot: Lot;
}

export default function Mostrar({ lot }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Lot: ${lot.name}`} />
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
                            <h1 className="text-2xl font-bold">{lot.name}</h1>
                            <p className="text-muted-foreground">Lot details</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(lot.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Lot Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Name:</strong> {lot.name}
                        </div>
                        <div>
                            <strong>Description:</strong>{' '}
                            {lot.description || 'N/A'}
                        </div>
                        <div>
                            <strong>Capacity:</strong> {lot.capacity || 'N/A'}
                        </div>
                        <div>
                            <strong>Location:</strong> {lot.location || 'N/A'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
