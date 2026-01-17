import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/weighings';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Weighings',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
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
    weighing: Weighing;
}

export default function Mostrar({ weighing }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Weighing: ${weighing.animal?.name}`} />
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
                                {weighing.animal?.name} Weighing
                            </h1>
                            <p className="text-muted-foreground">
                                Weighing details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(weighing.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Weighing Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Animal:</strong>{' '}
                            {weighing.animal?.name || 'N/A'}
                        </div>
                        <div>
                            <strong>Weight:</strong> {weighing.weight} kg
                        </div>
                        <div>
                            <strong>Date:</strong> {weighing.date}
                        </div>
                        <div>
                            <strong>Notes:</strong> {weighing.notes || 'N/A'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
