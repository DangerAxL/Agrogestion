import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ganadería',
        href: '/livestock',
    },
    {
        title: 'Animales',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
    },
];

interface Animal {
    id: number;
    name: string;
    breed?: {
        name: string;
    };
    lot?: {
        name: string;
    };
    gender: 'male' | 'female';
    birth_date?: string;
    status?: string;
    weighings: unknown[];
    healthRecords: unknown[];
    feedings: unknown[];
}

interface Props {
    animal: Animal;
}

export default function Mostrar({ animal }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Animal: ${animal.name}`} />
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
                                {animal.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Detalles del animal
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(animal.id).url}>Editarar</Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Básica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Nombre:</strong> {animal.name}
                            </div>
                            <div>
                                <strong>Género:</strong> {animal.gender}
                            </div>
                            <div>
                                <strong>Raza:</strong>{' '}
                                {animal.breed?.name || 'N/A'}
                            </div>
                            <div>
                                <strong>Lote:</strong>{' '}
                                {animal.lot?.name || 'N/A'}
                            </div>
                            <div>
                                <strong>Fecha de Nacimiento:</strong>{' '}
                                {animal.birth_date || 'N/A'}
                            </div>
                            <div>
                                <strong>Estado:</strong>{' '}
                                {animal.status || 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Registros</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Pesajes:</strong>{' '}
                                {animal.weighings.length}
                            </div>
                            <div>
                                <strong>Registros de Salud:</strong>{' '}
                                {animal.healthRecords.length}
                            </div>
                            <div>
                                <strong>Alimentaciones:</strong>{' '}
                                {animal.feedings.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
