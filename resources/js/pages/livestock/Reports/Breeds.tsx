import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import BreedsReportPdf from '@/components/pdf/BreedsReportPdf';
import domtoimage from 'dom-to-image-more';
import { useRef, useState, useEffect } from 'react';

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
        title: 'Breeds',
        href: '#',
    },
];

interface Props {
    breedsByLot: Record<string, Record<string, number>>;
    stages: string[];
    filters: {
        stage?: string;
    };
}

export default function Breeds({ breedsByLot, stages, filters }: Props) {
    const [chartImage, setChartImage] = useState<string>('');
    const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
    const chartRef = useRef<HTMLDivElement>(null);

    // Prepare chart data
    const chartData = Object.entries(breedsByLot).flatMap(([lotName, breeds]) =>
        Object.entries(breeds).map(([breedName, count]) => ({
            lot: lotName,
            breed: breedName,
            count,
        }))
    );

    const pieData = Object.entries(breedsByLot).flatMap(([lotName, breeds]) =>
        Object.entries(breeds).map(([breedName, count]) => ({
            name: `${breedName} (${lotName})`,
            value: count,
        }))
    );

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    useEffect(() => {
        if (chartRef.current) {
            // Usar dom-to-image-more en lugar de html2canvas para mejor soporte de colores modernos como oklch
            // La configuración de Tailwind CSS v4 con --color-function: rgb; asegura compatibilidad
            domtoimage.toPng(chartRef.current, {
                bgcolor: '#ffffff',
                quality: 1.0,
                width: chartRef.current.offsetWidth,
                height: chartRef.current.offsetHeight,
            }).then((dataUrl: string) => {
                setChartImage(dataUrl);
            }).catch((error: any) => {
                console.error('Error capturing chart with dom-to-image-more:', error);
                setChartImage('');
            });
        }
    }, [chartData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Breeds Report" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/reports">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Reports
                            </a>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Breeds Report
                            </h1>
                            <p className="text-muted-foreground">
                                Breeds distribution by lot
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href={`/reports/breeds?${new URLSearchParams(filters as any).toString()}&export=excel`}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Excel
                            </a>
                        </Button>
                        <PDFDownloadLink document={<BreedsReportPdf breedsByLot={breedsByLot} chartImage={chartImage} />} fileName="breeds-report.pdf">
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
                            action="/reports/breeds"
                            method="get"
                            className="flex gap-4"
                        >
                            <div className="flex-1">
                                <Label htmlFor="stage">Stage</Label>
                                <Select
                                    name="stage"
                                    defaultValue={filters.stage}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All stages" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All stages
                                        </SelectItem>
                                        {stages.map((stage) => (
                                            <SelectItem
                                                key={stage}
                                                value={stage}
                                            >
                                                {stage}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button type="submit">Apply Filters</Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Breeds by Lot</CardTitle>
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
                        <div ref={chartRef}>
                            {chartType === 'bar' && (
                                <BarChart width={800} height={400} data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="lot" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" />
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
                                    <XAxis dataKey="lot" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                                </LineChart>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(breedsByLot).map(([lotName, breeds]) => (
                                <div key={lotName} className="border-b pb-4">
                                    <h3 className="font-semibold">{lotName}</h3>
                                    <ul className="list-disc list-inside">
                                        {Object.entries(breeds).map(([breedName, count]) => (
                                            <li key={breedName}>
                                                {breedName}: {count}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}