import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Animals',
        href: index().url,
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
    status?: string;
}

interface Props {
    animals: {
        data: Animal[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ animals }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Animals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Animals</h1>
                        <p className="text-muted-foreground">
                            Manage your livestock animals
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Animal
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Animals List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {animals.data.map((animal) => (
                                <div
                                    key={animal.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {animal.caravana}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {animal.breed?.name} •{' '}
                                            {animal.lot?.name} • {animal.gender}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(animal.id).url}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(animal.id).url}>
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
