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
        title: 'Feedings',
        href: '#',
    },
];

interface Feeding {
    id: number;
    quantity: number;
    date: string;
    animal: {
        name: string;
    };
    feed_type: {
        name: string;
    };
}

interface Animal {
    id: number;
    name: string;
}

interface FeedType {
    id: number;
    name: string;
}

interface Props {
    feedings: Feeding[];
    animals: Animal[];
    feed_types: FeedType[];
    filters: {
        animal_id?: string;
        feed_type_id?: string;
        date_from?: string;
        date_to?: string;
    };
}

export default function Feedings({
    feedings,
    animals,
    feed_types,
    filters,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedings Report" />
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
                                Feedings Report
                            </h1>
                            <p className="text-muted-foreground">
                                Monitor feeding activities
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
                            action="/reports/feedings"
                            method="get"
                            className="flex flex-wrap gap-4"
                        >
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={filters.animal_id}
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
                                <Label htmlFor="feed_type_id">Feed Type</Label>
                                <Select
                                    name="feed_type_id"
                                    defaultValue={filters.feed_type_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All feed types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All feed types
                                        </SelectItem>
                                        {feed_types.map((feed_type) => (
                                            <SelectItem
                                                key={feed_type.id}
                                                value={feed_type.id.toString()}
                                            >
                                                {feed_type.name}
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
                        <CardTitle>Feedings ({feedings.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedings.map((feeding) => (
                                <div
                                    key={feeding.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {feeding.animal.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feeding.feed_type.name} •{' '}
                                            {feeding.quantity} kg •{' '}
                                            {feeding.date}
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
