import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FeedingsReportPdf from '@/components/pdf/FeedingsReportPdf';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Livestock',
        href: '/livestock',
    },
    {
        title: 'Reports',
        href: '/reports',
    },
    {
        title: 'Feedings',
        href: '#',
    },
];

interface Feeding {
    id: number;
    quantity: number;
    date: string;
    animal: {
        name: string;
    };
    feed_type: {
        name: string;
    };
}

interface Animal {
    id: number;
    name: string;
}

interface FeedType {
    id: number;
    name: string;
}

interface Props {
    feedings: Feeding[];
    animals: Animal[];
    feed_types: FeedType[];
    filters: {
        animal_id?: string;
        feed_type_id?: string;
        date_from?: string;
        date_to?: string;
    };
    weightGains: Record<string, {
        daily: number;
        monthly: number;
        semesterly: number;
    }>;
}

export default function Feedings({
    feedings,
    animals,
    feed_types,
    filters,
    weightGains,
}: Props) {
    const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');

    // Prepare chart data
    const chartData = Object.entries(weightGains).map(([feedType, gains]) => ({
        feedType,
        daily: gains.daily,
        monthly: gains.monthly,
        semesterly: gains.semesterly,
    }));

    const pieData = Object.entries(weightGains).map(([feedType, gains]) => ({
        name: feedType,
        value: gains.daily,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedings Report" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/reports">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás to Reports
                            </a>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Feedings Report
                            </h1>
                            <p className="text-muted-foreground">
                                Monitor feeding activities
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href={`/reports/feedings?${new URLSearchParams(filters as any).toString()}&export=excel`}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Excel
                            </a>
                        </Button>
                        <PDFDownloadLink document={<FeedingsReportPdf feedings={feedings} weightGains={weightGains} />} fileName="feedings-report.pdf">
                            {({ loading }) => (
                                <Button variant="outline" size="sm" disabled={loading}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {loading ? 'Generating PDF...' : 'Export PDF'}
                                </Button>
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action="/reports/feedings"
                            method="get"
                            className="flex flex-wrap gap-4"
                        >
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="animal_id">Animal</Label>
                                <Select
                                    name="animal_id"
                                    defaultValue={filters.animal_id || "all"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All animals" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All animals
                                        </SelectItem>
                                        {animals.map((animal) => (
                                            <SelectItem
                                                key={animal.id}
                                                value={animal.id.toString()}
                                            >
                                                {animal.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="feed_type_id">Feed Type</Label>
                                <Select
                                    name="feed_type_id"
                                    defaultValue={filters.feed_type_id || "all"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All feed types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All feed types
                                        </SelectItem>
                                        {feed_types.map((feed_type) => (
                                            <SelectItem
                                                key={feed_type.id}
                                                value={feed_type.id.toString()}
                                            >
                                                {feed_type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="date_from">From Date</Label>
                                <Input
                                    id="date_from"
                                    name="date_from"
                                    type="date"
                                    defaultValue={filters.date_from}
                                />
                            </div>
                            <div className="min-w-48 flex-1">
                                <Label htmlFor="date_to">To Date</Label>
                                <Input
                                    id="date_to"
                                    name="date_to"
                                    type="date"
                                    defaultValue={filters.date_to}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit">Apply Filters</Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Feedings ({feedings.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedings.map((feeding) => (
                                <div
                                    key={feeding.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {feeding.animal.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feeding.feed_type.name} •{' '}
                                            {feeding.quantity} kg •{' '}
                                            {feeding.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Weight Gains by Feed Type</CardTitle>
                            <div className="flex items-center gap-2">
                                <Label>Chart Type</Label>
                                <Select value={chartType} onValueChange={(value: 'bar' | 'pie' | 'line') => setChartType(value)}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bar">Bar</SelectItem>
                                        <SelectItem value="pie">Pie</SelectItem>
                                        <SelectItem value="line">Line</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {chartType === 'bar' && (
                                <BarChart width={800} height={400} data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="feedType" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="daily" fill="#8884d8" />
                                    <Bar dataKey="monthly" fill="#82ca9d" />
                                    <Bar dataKey="semesterly" fill="#ffc658" />
                                </BarChart>
                            )}
                            {chartType === 'pie' && (
                                <PieChart width={800} height={400}>
                                    <Pie
                                        data={pieData}
                                        cx={400}
                                        cy={200}
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            )}
                            {chartType === 'line' && (
                                <LineChart width={800} height={400} data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="feedType" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="daily" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="monthly" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="semesterly" stroke="#ffc658" />
                                </LineChart>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Weight Gains Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(weightGains).map(([feedType, gains]) => (
                                <div key={feedType} className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <h3 className="font-semibold">{feedType}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Daily: {gains.daily.toFixed(2)} kg • Monthly: {gains.monthly.toFixed(2)} kg • Semesterly: {gains.semesterly.toFixed(2)} kg
                                        </p>
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
