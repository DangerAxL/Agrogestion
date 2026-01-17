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
import { index, update } from '@/routes/medical-histories';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Medical Histories',
        href: index().url,
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
}

interface Veterinarian {
    id: number;
    name: string;
}

interface MedicalHistory {
    id: number;
    animal_id: number;
    type: string;
    description: string;
    date: string;
    veterinarian_id?: number;
    cost: number;
    withdrawal_days: number;
    release_date?: string;
    observations: string;
}

interface Props {
    medicalHistory: MedicalHistory;
    animals: Animal[];
    veterinarians: Veterinarian[];
}

export default function Edit({ medicalHistory, animals, veterinarians }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Medical History" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Medical History</h1>
                        <p className="text-muted-foreground">
                            Update medical history record
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Medical History Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(medicalHistory.id).url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select name="animal_id" defaultValue={medicalHistory.animal_id.toString()} required>
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
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" defaultValue={medicalHistory.type} required />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" defaultValue={medicalHistory.description} />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={medicalHistory.date}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="veterinarian_id">Veterinarian</Label>
                                <Select name="veterinarian_id" defaultValue={medicalHistory.veterinarian_id?.toString()}>
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
                                    defaultValue={medicalHistory.cost}
                                />
                            </div>
                            <div>
                                <Label htmlFor="withdrawal_days">Withdrawal Days</Label>
                                <Input
                                    id="withdrawal_days"
                                    name="withdrawal_days"
                                    type="number"
                                    defaultValue={medicalHistory.withdrawal_days}
                                />
                            </div>
                            <div>
                                <Label htmlFor="release_date">Release Date</Label>
                                <Input
                                    id="release_date"
                                    name="release_date"
                                    type="date"
                                    defaultValue={medicalHistory.release_date}
                                />
                            </div>
                            <div>
                                <Label htmlFor="observations">Observations</Label>
                                <Input id="observations" name="observations" defaultValue={medicalHistory.observations} />
                            </div>
                            <Button type="submit">Update Medical History</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}