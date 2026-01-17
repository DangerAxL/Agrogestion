import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Users',
        href: index().url,
    },
    {
        title: 'Show',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    roles: {
        name: string;
    }[];
}

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
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
                                {user.name}
                            </h1>
                            <p className="text-muted-foreground">
                                User details
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={edit(user.id).url}>Edit</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div>
                            <strong>Role:</strong> {user.roles.map(role => role.name).join(', ')}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}