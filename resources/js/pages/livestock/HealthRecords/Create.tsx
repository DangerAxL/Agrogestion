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
import { index, store } from '@/routes/health-records';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Health Records',
        href: index().url,
    },
    {
        title: 'Crear',
        href: '#',
    },
];

interface Animal {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Props {
    animals: Animal[];
    veterinarians: User[];
}

export default function Crear({ animals, veterinarians }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Health Record" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Crear Health Record
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new health record
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Record Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select name="animal_id" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select animal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {animals.map((animal) => (
                                            <SelectItem
                                                key={animal.id}
                                                value={animal.id.toString()}
                                            >
                                                {animal.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" required />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="veterinarian_id">Veterinarian</Label>
                                <Select name="veterinarian_id" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select veterinarian" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {veterinarians.map((veterinarian) => (
                                            <SelectItem
                                                key={veterinarian.id}
                                                value={veterinarian.id.toString()}
                                            >
                                                {veterinarian.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="cost">Cost</Label>
                                <Input
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <Label htmlFor="withdrawal_days">Withdrawal Days</Label>
                                <Input
                                    id="withdrawal_days"
                                    name="withdrawal_days"
                                    type="number"
                                    min="0"
                                />
                            </div>
                            <div>
                                <Label htmlFor="release_date">Release Date</Label>
                                <Input
                                    id="release_date"
                                    name="release_date"
                                    type="date"
                                />
                            </div>
                            <div>
                                <Label htmlFor="observations">Observations</Label>
                                <Input id="observations" name="observations" />
                            </div>
                            <Button type="submit">Crear Health Record</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
