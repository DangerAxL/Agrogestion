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
        title: 'Weighings',
        href: '#',
    },
];

interface Weighing {
    id: number;
    weight: number;
    date: string;
    animal: {
        name: string;
    };
}

interface Animal {
    id: number;
    name: string;
}

interface Props {
    weighings: Weighing[];
    animals: Animal[];
    filters: {
        animal_id?: string;
        date_from?: string;
        date_to?: string;
    };
}

export default function Weighings({ weighings, animals, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Weighings Report" />
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
                                Weighings Report
                            </h1>
                            <p className="text-muted-foreground">
                                Track animal weight changes
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
                            action="/reports/weighings"
                            method="get"
                            className="flex flex-wrap gap-4"
                        >
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={filters.animal_id || "all"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All animals" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All animals
                                        </SelectItem>
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
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="date_from">From Date</Label>
                                <Input
                                    id="date_from"
                                    name="date_from"
                                    type="date"
                                    defaultValue={filters.date_from}
                                />
                            </div>
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="date_to">To Date</Label>
                                <Input
                                    id="date_to"
                                    name="date_to"
                                    type="date"
                                    defaultValue={filters.date_to}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit">Apply Filters</Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Weighings ({weighings.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {weighings.map((weighing) => (
                                <div
                                    key={weighing.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {weighing.animal.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {weighing.weight} kg •{' '}
                                            {weighing.date}
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
