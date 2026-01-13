import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Configuration',
        href: '/config',
    },
];

interface Config {
    app_name: string;
    app_description: string;
    contact_email: string;
}

interface Props {
    config: Config;
}

export default function Index({ config }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Configuration</h1>
                        <p className="text-muted-foreground">
                            Manage application settings
                        </p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            General Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action="/config"
                            method="post"
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="app_name">
                                    Application Name
                                </Label>
                                <Input
                                    id="app_name"
                                    name="app_name"
                                    defaultValue={config.app_name}
                                />
                            </div>
                            <div>
                                <Label htmlFor="app_description">
                                    Description
                                </Label>
                                <textarea
                                    id="app_description"
                                    name="app_description"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    defaultValue={config.app_description}
                                />
                            </div>
                            <div>
                                <Label htmlFor="contact_email">
                                    Contact Email
                                </Label>
                                <Input
                                    id="contact_email"
                                    name="contact_email"
                                    type="email"
                                    defaultValue={config.contact_email}
                                />
                            </div>
                            <Button type="submit">Save Changes</Button>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
