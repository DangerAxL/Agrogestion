import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Reports',
        href: '/reports',
    },
    {
        title: 'Animals',
        href: '#',
    },
];

interface Animal {
    id: number;
    name: string;
    breed?: {
        name: string;
    };
    lot?: {
        name: string;
    };
    gender: 'male' | 'female';
    status?: string;
}

interface Lot {
    id: number;
    name: string;
}

interface Props {
    animals: Animal[];
    lots: Lot[];
    filters: {
        lot_id?: string;
    };
}

export default function Animals({ animals, lots, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Animals Report" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/reports">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás to Reports
                            </a>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Animals Report
                            </h1>
                            <p className="text-muted-foreground">
                                Inventory of all animals
                            </p>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action="/reports/animals"
                            method="get"
                            className="flex gap-4"
                        >
                            <div className="flex-1">
                                <Label htmlFor="lot_id">Lot</Label>
                                <Select
                                    name="lot_id"
                                    defaultValue={filters.lot_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All lots" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            All lots
                                        </SelectItem>
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
                            <div className="flex items-end">
                                <Button type="submit">Apply Filters</Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Animals ({animals.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {animals.map((animal) => (
                                <div
                                    key={animal.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {animal.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {animal.breed?.name} •{' '}
                                            {animal.lot?.name} • {animal.gender}{' '}
                                            • {animal.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
