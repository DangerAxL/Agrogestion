import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/veterinary-treatments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Veterinary Treatments',
        href: index().url,
    },
];

interface VeterinaryTreatment {
    id: number;
    treatment_catalog_id: number;
    animal_id: number;
    applied_at: string;
    dosage: string;
    notes: string;
    animal?: {
        caravana: string;
    };
    treatmentCatalog?: {
        name: string;
    };
}

interface Props {
    veterinaryTreatments: {
        data: VeterinaryTreatment[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ veterinaryTreatments }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Veterinary Treatments" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Veterinary Treatments</h1>
                        <p className="text-muted-foreground">
                            Manage your livestock veterinary treatments
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Veterinary Treatment
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Veterinary Treatments List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {veterinaryTreatments.data.map((treatment) => (
                                <div
                                    key={treatment.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {treatment.treatmentCatalog?.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {treatment.animal?.caravana} • {treatment.applied_at} • Dosage: {treatment.dosage}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {treatment.notes}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(treatment.id).url}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(treatment.id).url}>
                                                Edit
                                            </Link>
                                        </Button>
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