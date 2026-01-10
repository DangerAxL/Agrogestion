import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/health-records';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Health Records',
        href: index().url,
    },
    {
        title: 'Mostrar',
        href: '#',
    },
];

interface HealthRecord {
    id: number;
    animal?: {
        name: string;
    };
    type: string;
    description: string;
    date: string;
    veterinarian?: {
        name: string;
    };
    cost?: number;
}

interface Props {
    healthRecord: HealthRecord;
}

export default function Mostrar({ healthRecord }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Health Record: ${healthRecord.type}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {healthRecord.type}
                            </h1>
                            <p className="text-muted-foreground">
                                Health record details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(healthRecord.id).url}>Editar</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Health Record Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Animal:</strong>{' '}
                            {healthRecord.animal?.name || 'N/A'}
                        </div>
                        <div>
                            <strong>Type:</strong> {healthRecord.type}
                        </div>
                        <div>
                            <strong>Description:</strong>{' '}
                            {healthRecord.description || 'N/A'}
                        </div>
                        <div>
                            <strong>Date:</strong> {healthRecord.date}
                        </div>
                        <div>
                            <strong>Veterinarian:</strong>{' '}
                            {healthRecord.veterinarian?.name || 'N/A'}
                        </div>
                        <div>
                            <strong>Cost:</strong> ${healthRecord.cost || 0}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
