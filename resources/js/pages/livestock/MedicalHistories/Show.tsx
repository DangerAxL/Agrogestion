import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/medical-histories';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Medical Histories',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
];

interface MedicalHistory {
    id: number;
    type: string;
    description: string;
    date: string;
    cost: number;
    withdrawal_days: number;
    release_date?: string;
    observations: string;
    animal?: {
        caravana: string;
    };
    veterinarian?: {
        name: string;
    };
}

interface Props {
    medicalHistory: MedicalHistory;
}

export default function Show({ medicalHistory }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Medical History: ${medicalHistory.type}`} />
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
                                {medicalHistory.type}
                            </h1>
                            <p className="text-muted-foreground">
                                Medical history details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(medicalHistory.id).url}>Edit</Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Type:</strong> {medicalHistory.type}
                            </div>
                            <div>
                                <strong>Description:</strong> {medicalHistory.description || 'N/A'}
                            </div>
                            <div>
                                <strong>Date:</strong> {medicalHistory.date}
                            </div>
                            <div>
                                <strong>Animal:</strong> {medicalHistory.animal?.caravana || 'N/A'}
                            </div>
                            <div>
                                <strong>Veterinarian:</strong> {medicalHistory.veterinarian?.name || 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Cost:</strong> ${medicalHistory.cost}
                            </div>
                            <div>
                                <strong>Withdrawal Days:</strong> {medicalHistory.withdrawal_days}
                            </div>
                            <div>
                                <strong>Release Date:</strong> {medicalHistory.release_date || 'N/A'}
                            </div>
                            <div>
                                <strong>Observations:</strong> {medicalHistory.observations || 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}