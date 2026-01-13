import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/supplies';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Supplies',
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
            <Head title="Crear Supply" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Crear Supply</h1>
                        <p className="text-muted-foreground">
                            Add a new supply to your livestock inventory
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Supply Details</CardTitle>
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
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" required />
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="unit">Unit</Label>
                                <Input id="unit" name="unit" required />
                            </div>
                            <div>
                                <Label htmlFor="min_stock">Minimum Stock</Label>
                                <Input
                                    id="min_stock"
                                    name="min_stock"
                                    type="number"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input id="supplier" name="supplier" />
                            </div>
                            <div>
                                <Label htmlFor="cost_per_unit">
                                    Cost per Unit
                                </Label>
                                <Input
                                    id="cost_per_unit"
                                    name="cost_per_unit"
                                    type="number"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <Button type="submit">Crear Supply</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
