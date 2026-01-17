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
import { index, store } from '@/routes/animals';
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
        title: 'Create',
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

interface Props {
    lots: Lot[];
    breeds: Breed[];
}

export default function Crear({ lots, breeds }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Animal" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Create Animal</h1>
                        <p className="text-muted-foreground">
                            Add a new animal to your livestock
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Animal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="caravana">Caravana</Label>
                                <Input id="caravana" name="caravana" required />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select name="gender" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
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
                                <Select name="breed_id">
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
                                <Select name="lot_id">
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
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" name="status" />
                            </div>
                            <Button type="submit">Create Animal</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
