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
import { index, update } from '@/routes/veterinary-treatments';
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
        title: 'Edit',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
}

interface VeterinaryTreatment {
    id: number;
    treatment_name: string;
    animal_id: number;
    applied_at: string;
    dosage: string;
    notes: string;
}

interface Props {
    veterinaryTreatment: VeterinaryTreatment;
    animals: Animal[];
}

export default function Edit({ veterinaryTreatment, animals, treatmentCatalogs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Veterinary Treatment" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Veterinary Treatment</h1>
                        <p className="text-muted-foreground">
                            Update veterinary treatment record
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Veterinary Treatment Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(veterinaryTreatment.id).url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="treatment_name">Treatment Name</Label>
                                <Input id="treatment_name" name="treatment_name" defaultValue={veterinaryTreatment.treatment_name} required />
                            </div>
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select name="animal_id" defaultValue={veterinaryTreatment.animal_id.toString()} required>
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
                                    defaultValue={veterinaryTreatment.applied_at}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="dosage">Dosage</Label>
                                <Input id="dosage" name="dosage" defaultValue={veterinaryTreatment.dosage} required />
                            </div>
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Input id="notes" name="notes" defaultValue={veterinaryTreatment.notes} />
                            </div>
                            <Button type="submit">Update Veterinary Treatment</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}