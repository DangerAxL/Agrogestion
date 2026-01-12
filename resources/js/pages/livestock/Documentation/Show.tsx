import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/documentation';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';

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
        title: 'Ver',
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

export default function Mostrar({ document }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Documento: ${document.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver a Documentación
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {document.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Información del documento
                            </p>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles del Documento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <strong>Nombre:</strong> {document.name}
                            </div>
                            <div>
                                <strong>Tamaño:</strong> {(document.size / 1024).toFixed(2)} KB
                            </div>
                            <div>
                                <strong>Última modificación:</strong> {new Date(document.last_modified * 1000).toLocaleString()}
                            </div>
                            <Button asChild>
                                <a href={show(document.id).url} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar Documento
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
