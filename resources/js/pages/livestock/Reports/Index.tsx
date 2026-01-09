import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, FileText, Heart, Scale, Truck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Reports',
        href: '/reports',
    },
];

export default function Index() {
    const reports = [
        {
            title: 'Animals Report',
            description: 'Ver inventory of all animals with filters',
            href: '/reports/animals',
            icon: Users,
        },
        {
            title: 'Weighings Report',
            description: 'Track animal weight changes over time',
            href: '/reports/weighings',
            icon: Scale,
        },
        {
            title: 'Feedings Report',
            description: 'Monitor feeding activities and schedules',
            href: '/reports/feedings',
            icon: BarChart3,
        },
        {
            title: 'Health Report',
            description: 'Review health records and treatments',
            href: '/reports/health',
            icon: Heart,
        },
        {
            title: 'Supplies Report',
            description: 'Inventory status of supplies',
            href: '/reports/supplies',
            icon: Truck,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Reports</h1>
                        <p className="text-muted-foreground">
                            Generate and view various livestock reports
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report) => (
                        <Card
                            key={report.href}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <report.icon className="h-5 w-5" />
                                    {report.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {report.description}
                                </p>
                                <Button asChild className="w-full">
                                    <Link href={report.href}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Ver Report
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
