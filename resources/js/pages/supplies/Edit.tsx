import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/supplies';
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
        title: 'Editar',
        href: '#',
    },
];

interface Supply {
    id: number;
    name: string;
    type: string;
    quantity: number;
    unit: string;
    min_stock: number;
    supplier?: string;
    cost_per_unit: number;
}

interface Props {
    supply: Supply;
}

export default function Editar({ supply }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Supply: ${supply.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Supply</h1>
                        <p className="text-muted-foreground">
                            Update supply information
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Supply Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={update(supply.id).url}
                            method="put"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={supply.name}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    name="type"
                                    defaultValue={supply.type}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    step="0.01"
                                    defaultValue={supply.quantity.toString()}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    name="unit"
                                    defaultValue={supply.unit}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="min_stock">Minimum Stock</Label>
                                <Input
                                    id="min_stock"
                                    name="min_stock"
                                    type="number"
                                    step="0.01"
                                    defaultValue={supply.min_stock.toString()}
                                />
                            </div>
                            <div>
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input
                                    id="supplier"
                                    name="supplier"
                                    defaultValue={supply.supplier || ''}
                                />
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
                                    defaultValue={supply.cost_per_unit.toString()}
                                    required
                                />
                            </div>
                            <Button type="submit">Update Supply</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
