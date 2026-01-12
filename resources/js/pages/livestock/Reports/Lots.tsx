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
import { Head } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LotsReportPdf from '@/components/pdf/LotsReportPdf';
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
        title: 'Lots',
        href: '#',
    },
];

interface LotStats {
    id: number;
    name: string;
    total_animals: number;
    active_animals: number;
    inactive_animals: number;
    average_weight: number;
}

interface Props {
    lotsStats: LotStats[];
}

export default function Lots({ lotsStats }: Props) {
    const [chartImage, setChartImage] = useState<string>('');
    const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
    const chartRef = useRef<HTMLDivElement>(null);

    // Prepare chart data
    const chartData = lotsStats.map((lot) => ({
        name: lot.name,
        total: lot.total_animals,
        active: lot.active_animals,
        inactive: lot.inactive_animals,
    }));

    const pieData = lotsStats.map((lot) => ({
        name: lot.name,
        value: lot.total_animals,
    }));

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
            <Head title="Lots Report" />
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
                                Lots Report
                            </h1>
                            <p className="text-muted-foreground">
                                Lot statistics overview
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/reports/lots?export=excel">
                                <Download className="mr-2 h-4 w-4" />
                                Export Excel
                            </a>
                        </Button>
                        <PDFDownloadLink document={<LotsReportPdf lotsStats={lotsStats} chartImage={chartImage} />} fileName="lots-report.pdf">
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
                        <div className="flex items-center justify-between">
                            <CardTitle>Lots Statistics</CardTitle>
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
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="active" stackId="a" fill="#82ca9d" />
                                    <Bar dataKey="inactive" stackId="a" fill="#ffc658" />
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
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="active" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="inactive" stroke="#ffc658" />
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
                            {lotsStats.map((lot) => (
                                <div key={lot.id} className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <h3 className="font-semibold">{lot.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Total: {lot.total_animals} • Activos: {lot.active_animals} • Inactivos: {lot.inactive_animals} • Peso Promedio: {lot.average_weight.toFixed(2)} kg
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