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
import { index, update } from '@/routes/weighings';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Weighings',
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

interface Weighing {
    id: number;
    animal_id: number;
    weight: number;
    date: string;
    notes?: string;
}

interface Props {
    weighing: Weighing;
    animals: Animal[];
}

export default function Editar({ weighing, animals }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Weighing: ${weighing.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Weighing</h1>
                        <p className="text-muted-foreground">
                            Update weighing information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Weighing Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(weighing.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={weighing.animal_id.toString()}
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
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    step="0.01"
                                    defaultValue={weighing.weight.toString()}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={weighing.date}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Input
                                    id="notes"
                                    name="notes"
                                    defaultValue={weighing.notes}
                                />
                            </div>
                            <Button type="submit">Update Weighing</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
