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
        title: 'Edit',
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
    caravana: string;
    breed_id?: number;
    lot_id?: number;
    weight_entry?: number;
    weight_current?: number;
    entry_date?: string;
    status?: string;
    stages?: { id: number; stage_name: string }[];
    caravanas?: { id: number; caravana_nro: string; color: string }[];
}

interface Props {
    animal: Animal;
    lots: Lot[];
    breeds: Breed[];
}

export default function Editar({ animal, lots, breeds }: Props) {
    const activeStage = animal.stages && animal.stages.length > 0 ? animal.stages[animal.stages.length - 1] : null;
    const activeCaravana = animal.caravanas && animal.caravanas.length > 0 ? animal.caravanas[animal.caravanas.length - 1] : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Animal: ${animal.caravana}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Animal</h1>
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
                                <Label htmlFor="caravana">Caravana (ID)</Label>
                                <Input
                                    id="caravana"
                                    name="caravana"
                                    defaultValue={animal.caravana}
                                    required
                                />
                            </div>

                            {/* New Fields */}
                            <div>
                                <Label htmlFor="caravana_nro">Caravana Number (Visual)</Label>
                                <Input
                                    id="caravana_nro"
                                    name="caravana_nro"
                                    defaultValue={activeCaravana?.caravana_nro}
                                />
                            </div>
                            <div>
                                <Label htmlFor="color">Caravana Color</Label>
                                <Input
                                    id="color"
                                    name="color"
                                    defaultValue={activeCaravana?.color}
                                />
                            </div>
                            <div>
                                <Label htmlFor="stage_name">Stage Name</Label>
                                <Input
                                    id="stage_name"
                                    name="stage_name"
                                    defaultValue={activeStage?.stage_name}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="weight_entry">Entry Weight (kg)</Label>
                                    <Input
                                        id="weight_entry"
                                        name="weight_entry"
                                        type="number"
                                        step="0.01"
                                        defaultValue={animal.weight_entry}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="weight_current">Current Weight (kg)</Label>
                                    <Input
                                        id="weight_current"
                                        name="weight_current"
                                        type="number"
                                        step="0.01"
                                        defaultValue={animal.weight_current}
                                        required
                                    />
                                </div>
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
                                <Label htmlFor="entry_date">Entry Date</Label>
                                <Input
                                    id="entry_date"
                                    name="entry_date"
                                    type="date"
                                    defaultValue={animal.entry_date}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Input
                                    id="status"
                                    name="status"
                                    defaultValue={animal.status}
                                    required
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
