import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/breeds';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Breeds',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
    },
];

interface Breed {
    id: number;
    name: string;
    description?: string;
    species: string;
}

interface Props {
    breed: Breed;
}

export default function Mostrar({ breed }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Breed: ${breed.name}`} />
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
                            <h1 className="text-2xl font-bold">{breed.name}</h1>
                            <p className="text-muted-foreground">
                                Breed details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(breed.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Breed Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Name:</strong> {breed.name}
                        </div>
                        <div>
                            <strong>Species:</strong> {breed.species}
                        </div>
                        <div>
                            <strong>Description:</strong>{' '}
                            {breed.description || 'N/A'}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
