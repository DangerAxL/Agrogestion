import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/medical-histories';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Medical Histories',
        href: index().url,
    },
];

interface MedicalHistory {
    id: number;
    type: string;
    description: string;
    date: string;
    cost: number;
    animal?: {
        caravana: string;
    };
    veterinarian?: {
        name: string;
    };
}

interface Props {
    medicalHistories: {
        data: MedicalHistory[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ medicalHistories }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Medical Histories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Medical Histories</h1>
                        <p className="text-muted-foreground">
                            Manage your livestock medical histories
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Medical History
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Medical Histories List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {medicalHistories.data.map((medicalHistory) => (
                                <div
                                    key={medicalHistory.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {medicalHistory.type}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {medicalHistory.animal?.caravana} • {medicalHistory.date} • ${medicalHistory.cost}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {medicalHistory.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(medicalHistory.id).url}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(medicalHistory.id).url}>
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