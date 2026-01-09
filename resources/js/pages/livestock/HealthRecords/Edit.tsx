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
import { index, update } from '@/routes/health-records';
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
        title: 'Editar',
        href: '#',
    },
];

interface Animal {
    id: number;
    name: string;
}

interface HealthRecord {
    id: number;
    animal_id: number;
    type: string;
    description: string;
    date: string;
    veterinarian?: string;
    cost?: number;
}

interface Props {
    healthRecord: HealthRecord;
    animals: Animal[];
}

export default function Editar({ healthRecord, animals }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Health Record: ${healthRecord.type}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Editar Health Record
                        </h1>
                        <p className="text-muted-foreground">
                            Update health record information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Record Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(healthRecord.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={healthRecord.animal_id.toString()}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
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
                                <Input
                                    id="type"
                                    name="type"
                                    defaultValue={healthRecord.type}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    defaultValue={healthRecord.description}
                                />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={healthRecord.date}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="veterinarian">
                                    Veterinarian
                                </Label>
                                <Input
                                    id="veterinarian"
                                    name="veterinarian"
                                    defaultValue={healthRecord.veterinarian}
                                />
                            </div>
                            <div>
                                <Label htmlFor="cost">Cost</Label>
                                <Input
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    step="0.01"
                                    defaultValue={healthRecord.cost}
                                />
                            </div>
                            <Button type="submit">Update Health Record</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
