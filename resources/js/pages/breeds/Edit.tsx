import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/breeds';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

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
        title: 'Editar',
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

export default function Editar({ breed }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Breed: ${breed.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Breed</h1>
                        <p className="text-muted-foreground">
                            Update breed information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Breed Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(breed.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={breed.name}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="species">Species</Label>
                                <Input
                                    id="species"
                                    name="species"
                                    defaultValue={breed.species}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    defaultValue={breed.description || ''}
                                />
                            </div>
                            <Button type="submit">Update Breed</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
