import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Animals',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
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
            <Head title={`Animal: ${animal.caravana}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {animal.caravana}
                            </h1>
                            <p className="text-muted-foreground">
                                Animal details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(animal.id).url}>Edit</Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Caravana:</strong> {animal.caravana}
                            </div>
                            <div>
                                <strong>Gender:</strong> {animal.gender}
                            </div>
                            <div>
                                <strong>Breed:</strong>{' '}
                                {animal.breed?.name || 'N/A'}
                            </div>
                            <div>
                                <strong>Lot:</strong>{' '}
                                {animal.lot?.name || 'N/A'}
                            </div>
                            <div>
                                <strong>Birth Date:</strong>{' '}
                                {animal.birth_date || 'N/A'}
                            </div>
                            <div>
                                <strong>Status:</strong>{' '}
                                {animal.status || 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Records</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Weighings:</strong>{' '}
                                {animal.weighings.length}
                            </div>
                            <div>
                                <strong>Health Records:</strong>{' '}
                                {animal.healthRecords.length}
                            </div>
                            <div>
                                <strong>Feedings:</strong>{' '}
                                {animal.feedings.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
