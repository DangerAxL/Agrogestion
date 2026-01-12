import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/veterinary-treatments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Veterinary Treatments',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
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
    veterinaryTreatment: VeterinaryTreatment;
}

export default function Show({ veterinaryTreatment }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Veterinary Treatment: ${veterinaryTreatment.treatmentCatalog?.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {veterinaryTreatment.treatmentCatalog?.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Veterinary treatment details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(veterinaryTreatment.id).url}>Edit</Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Treatment:</strong> {veterinaryTreatment.treatmentCatalog?.name || 'N/A'}
                            </div>
                            <div>
                                <strong>Animal:</strong> {veterinaryTreatment.animal?.caravana || 'N/A'}
                            </div>
                            <div>
                                <strong>Applied At:</strong> {veterinaryTreatment.applied_at}
                            </div>
                            <div>
                                <strong>Dosage:</strong> {veterinaryTreatment.dosage}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Notes:</strong> {veterinaryTreatment.notes || 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}