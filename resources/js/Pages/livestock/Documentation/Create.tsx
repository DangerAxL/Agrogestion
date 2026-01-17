import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/documentation';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
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
        title: 'Crear',
        href: '#',
    },
];

export default function Crear() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Document" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href={index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver a Documentación
                            </a>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Subir Documento
                            </h1>
                            <p className="text-muted-foreground">
                                Sube un nuevo documento al sistema
                            </p>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Documento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={store().url}
                            method="post"
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="document">Documento</Label>
                                <Input
                                    id="document"
                                    name="document"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Selecciona un archivo PDF, DOC, DOCX o TXT (máximo 10MB)
                                </p>
                            </div>
                            <Button type="submit">Subir Documento</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
