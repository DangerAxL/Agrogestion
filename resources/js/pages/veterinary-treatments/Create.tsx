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
import { index, store } from '@/routes/veterinary-treatments';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Veterinary Treatments',
        href: index().url,
    },
    {
        title: 'Create',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
}

interface Props {
    animals: Animal[];
}

export default function Create({ animals, treatmentCatalogs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Veterinary Treatment" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Create Veterinary Treatment</h1>
                        <p className="text-muted-foreground">
                            Add a new veterinary treatment record
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Veterinary Treatment Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="treatment_name">Treatment Name</Label>
                                <Input id="treatment_name" name="treatment_name" required />
                            </div>
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
                                                {animal.caravana}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="applied_at">Applied At</Label>
                                <Input
                                    id="applied_at"
                                    name="applied_at"
                                    type="date"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="dosage">Dosage</Label>
                                <Input id="dosage" name="dosage" required />
                            </div>
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Input id="notes" name="notes" />
                            </div>
                            <Button type="submit">Create Veterinary Treatment</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}