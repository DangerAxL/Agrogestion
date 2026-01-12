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
import { index, store } from '@/routes/health-alerts';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Health Alerts',
        href: index().url,
    },
    {
        title: 'Create',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
}

interface Props {
    animals: Animal[];
}

export default function Create({ animals }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Health Alert" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Create Health Alert</h1>
                        <p className="text-muted-foreground">
                            Add a new health alert for your livestock
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Alert Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select name="animal_id" required>
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
                                <Input id="type" name="type" required />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <Input id="message" name="message" required />
                            </div>
                            <div>
                                <Label htmlFor="alert_date">Alert Date</Label>
                                <Input
                                    id="alert_date"
                                    name="alert_date"
                                    type="date"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="priority">Priority</Label>
                                <Select name="priority" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">Create Health Alert</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}