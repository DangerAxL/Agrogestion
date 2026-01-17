import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, edit, index, show } from '@/routes/feed-types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Feed Types',
        href: index().url,
    },
];

interface FeedType {
    id: number;
    name: string;
    description?: string;
    category: string;
}

interface Props {
    feedTypes: {
        data: FeedType[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ feedTypes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feed Types" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Feed Types</h1>
                        <p className="text-muted-foreground">
                            Manage your livestock feed types
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Feed Type
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Feed Types List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedTypes.data.map((feedType) => (
                                <div
                                    key={feedType.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {feedType.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feedType.category} •{' '}
                                            {feedType.description ||
                                                'No description'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(feedType.id).url}>
                                                Ver
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(feedType.id).url}>
                                                Editar
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
