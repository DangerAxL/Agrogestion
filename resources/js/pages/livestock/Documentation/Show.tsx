import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Documentation',
        href: '/documentation',
    },
    {
        title: 'Ver',
        href: '#',
    },
];

interface Document {
    id: number;
    title: string;
    description: string;
    content: string;
    created_at: string;
}

interface Props {
    document: Document;
}

export default function Mostrar({ document }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={document.title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/documentation">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás to Documentation
                            </a>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {document.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {document.description}
                            </p>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <pre className="whitespace-pre-wrap">
                                {document.content}
                            </pre>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                            Creard: {document.created_at}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
