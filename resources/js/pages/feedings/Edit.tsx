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
import { index, update } from '@/routes/feedings';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Feedings',
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

interface Lot {
    id: number;
    name: string;
}

interface FeedType {
    id: number;
    name: string;
}

interface Feeding {
    id: number;
    animal_id?: number;
    lot_id?: number;
    feed_type: string;
    quantity: number;
    unit: string;
    date: string;
    cost?: number;
}

interface Props {
    feeding: Feeding;
    animals: Animal[];
    lots: Lot[];
    feedTypes: FeedType[];
}

export default function Editar({ feeding, animals, lots, feedTypes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Feeding: ${feeding.feed_type}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Feeding</h1>
                        <p className="text-muted-foreground">
                            Update feeding information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Feeding Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(feeding.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">
                                    Animal (optional)
                                </Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={feeding.animal_id?.toString()}
                                >
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
                                <Label htmlFor="lot_id">Lot (optional)</Label>
                                <Select
                                    name="lot_id"
                                    defaultValue={feeding.lot_id?.toString()}
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
                                <Label htmlFor="feed_type">Feed Type</Label>
                                <Select
                                    name="feed_type"
                                    defaultValue={feeding.feed_type}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {feedTypes.map((feedType) => (
                                            <SelectItem
                                                key={feedType.id}
                                                value={feedType.name}
                                            >
                                                {feedType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    step="0.01"
                                    defaultValue={feeding.quantity}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    name="unit"
                                    defaultValue={feeding.unit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={feeding.date}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="cost">Cost</Label>
                                <Input
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    step="0.01"
                                    defaultValue={feeding.cost}
                                />
                            </div>
                            <Button type="submit">Update Feeding</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
