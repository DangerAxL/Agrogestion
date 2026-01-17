import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/documentation';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ganadería',
        href: '/livestock',
    },
    {
        title: 'Documentación',
        href: index().url,
    },
    {
        title: 'Editar',
        href: '#',
    },
];

interface Document {
    id: number;
    name: string;
    path: string;
    size: number;
    last_modified: number;
}

interface Props {
    document: Document;
}

export default function Edit({ document }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Documento: ${document.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Documento</h1>
                        <p className="text-muted-foreground">
                            Los documentos no se pueden editar directamente
                        </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a Documentación
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Documento: {document.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Los documentos subidos no se pueden editar. Si necesitas modificar este documento,
                                elimina el actual y sube uno nuevo.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={show(document.id).url}>
                                        Ver Documento
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={index().url}>
                                        Volver a Lista
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}