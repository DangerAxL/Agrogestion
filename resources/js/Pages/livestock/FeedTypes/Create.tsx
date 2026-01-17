import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/feed-types';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Feed Types',
        href: index().url,
    },
    {
        title: 'Crear',
        href: '#',
    },
];

export default function Crear() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Feed Type" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Crear Feed Type</h1>
                        <p className="text-muted-foreground">
                            Add a new feed type to your livestock
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Feed Type Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" name="category" required />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" />
                            </div>
                            <Button type="submit">Crear Feed Type</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
