import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

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
        title: 'Editar',
        href: '#',
    },
];

interface Lot {
    id: number;
    name: string;
}

interface Breed {
    id: number;
    name: string;
}

interface Animal {
    id: number;
    name: string;
    breed_id?: number;
    lot_id?: number;
    gender: 'male' | 'female';
    birth_date?: string;
    status?: string;
}

interface Props {
    animal: Animal;
    lots: Lot[];
    breeds: Breed[];
}

export default function Editar({ animal, lots, breeds }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Animal: ${animal.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Animal</h1>
                        <p className="text-muted-foreground">
                            Update animal information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Animal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(animal.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={animal.name}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    name="gender"
                                    defaultValue={animal.gender}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="breed_id">Breed</Label>
                                <Select
                                    name="breed_id"
                                    defaultValue={animal.breed_id?.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select breed" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {breeds.map((breed) => (
                                            <SelectItem
                                                key={breed.id}
                                                value={breed.id.toString()}
                                            >
                                                {breed.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="lot_id">Lot</Label>
                                <Select
                                    name="lot_id"
                                    defaultValue={animal.lot_id?.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select lot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {lots.map((lot) => (
                                            <SelectItem
                                                key={lot.id}
                                                value={lot.id.toString()}
                                            >
                                                {lot.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="birth_date">Birth Date</Label>
                                <Input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    defaultValue={animal.birth_date}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Input
                                    id="status"
                                    name="status"
                                    defaultValue={animal.status}
                                />
                            </div>
                            <Button type="submit">Update Animal</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
