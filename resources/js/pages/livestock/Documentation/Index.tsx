import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Documentation',
        href: '/documentation',
    },
];

interface Document {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Props {
    documents: Document[];
}

export default function Index({ documents }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documentation" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Documentation</h1>
                        <p className="text-muted-foreground">
                            Manage system documentation
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/documentation/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Document
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((document) => (
                        <Card
                            key={document.id}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    {document.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {document.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Creard: {document.created_at}
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    asChild
                                >
                                    <Link
                                        href={`/documentation/${document.id}`}
                                    >
                                        Ver
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
