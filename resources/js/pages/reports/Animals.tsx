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
import AnimalsReportPdf from '@/components/pdf/AnimalsReportPdf';
import { exportToExcel } from '@/utils/excel';
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
        title: 'Animals',
        href: '#',
    },
];

interface Animal {
    id: number;
    caravana: string;
    breed?: {
        name: string;
    };
    lot?: {
        name: string;
    };
    weight_entry: number;
    weight_current: number;
    status: string;
    active: boolean;
    entry_date?: string;
    withdrawal_date?: string;
}

interface Lot {
    id: number;
    name: string;
}

interface Props {
    animals: Animal[];
    lots: Lot[];
    filters: {
        lot_id?: string;
    };
    charts: {
        animalsByLot: Record<string, number>;
        animalsByBreed: Record<string, number>;
        animalsByStatus: Record<string, number>;
        activeVsInactive: {
            active: number;
            inactive: number;
        };
    };
}

export default function Animals({ animals, lots, filters, charts }: Props) {
    const [chartTypes, setChartTypes] = useState({
        animalsByLot: 'bar' as 'bar' | 'pie' | 'line',
        animalsByBreed: 'bar' as 'bar' | 'pie' | 'line',
        animalsByStatus: 'pie' as 'bar' | 'pie' | 'line',
        activeVsInactive: 'pie' as 'bar' | 'pie' | 'line',
    });

    // Filter out lots with invalid id
    const validLots = lots.filter(lot => lot.id != null && lot.id !== undefined);

    // Prepare chart data
    const animalsByLotData = Object.entries(charts.animalsByLot).map(([name, count]) => ({ name, count }));
    const animalsByBreedData = Object.entries(charts.animalsByBreed).map(([name, count]) => ({ name, count }));
    const animalsByStatusData = Object.entries(charts.animalsByStatus).map(([name, count]) => ({ name, count }));
    const activeVsInactiveData = [
        { name: 'Activos', value: charts.activeVsInactive.active },
        { name: 'Inactivos', value: charts.activeVsInactive.inactive },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Animals Report" />
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
                                Animals Report
                            </h1>
                            <p className="text-muted-foreground">
                                Inventory of all animals
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => exportToExcel(animals, [
                                { key: 'id', header: 'ID' },
                                { key: 'caravana', header: 'Caravana' },
                                { key: 'breed.name', header: 'Breed' },
                                { key: 'lot.name', header: 'Lot' },
                                { key: 'status', header: 'Status' },
                                { key: 'active', header: 'Active' },
                                { key: 'weight_entry', header: 'Weight Entry' },
                                { key: 'weight_current', header: 'Weight Current' },
                                { key: 'entry_date', header: 'Entry Date' },
                            ], 'animals_report')}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export Excel
                        </Button>
                        <PDFDownloadLink document={<AnimalsReportPdf animals={animals} />} fileName="animals-report.pdf">
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
                            action="/reports/animals"
                            method="get"
                            className="flex gap-4"
                        >
                            <div className="flex-1">
                                <Label htmlFor="lot_id">Lot</Label>
                                <Select
                                    name="lot_id"
                                    defaultValue={filters.lot_id || "all"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All lots" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All lots
                                        </SelectItem>
                                        {lots.map((lot) => (
                                            <SelectItem
                                                key={lot.id}
                                                value={lot.id.toString()}
                                            >
                                                {lot.name}
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
                        <CardTitle>Animals ({animals.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {animals.map((animal) => (
                                <div
                                    key={animal.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {animal.caravana}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {animal.breed?.name} •{' '}
                                            {animal.lot?.name} • {animal.status}{' '}
                                            • {animal.active ? 'Activo' : 'Inactivo'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Animales por Lote</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Label>Chart Type</Label>
                                    <Select value={chartTypes.animalsByLot} onValueChange={(value: 'bar' | 'pie' | 'line') => setChartTypes(prev => ({ ...prev, animalsByLot: value }))}>
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
                                {chartTypes.animalsByLot === 'bar' && (
                                    <BarChart width={400} height={300} data={animalsByLotData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                )}
                                {chartTypes.animalsByLot === 'pie' && (
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={animalsByLotData.map(d => ({ name: d.name, value: d.count }))}
                                            cx={200}
                                            cy={150}
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {animalsByLotData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                )}
                                {chartTypes.animalsByLot === 'line' && (
                                    <LineChart width={400} height={300} data={animalsByLotData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
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
                            <div className="flex items-center justify-between">
                                <CardTitle>Animales por Raza</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Label>Chart Type</Label>
                                    <Select value={chartTypes.animalsByBreed} onValueChange={(value: 'bar' | 'pie' | 'line') => setChartTypes(prev => ({ ...prev, animalsByBreed: value }))}>
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
                                {chartTypes.animalsByBreed === 'bar' && (
                                    <BarChart width={400} height={300} data={animalsByBreedData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#82ca9d" />
                                    </BarChart>
                                )}
                                {chartTypes.animalsByBreed === 'pie' && (
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={animalsByBreedData.map(d => ({ name: d.name, value: d.count }))}
                                            cx={200}
                                            cy={150}
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#82ca9d"
                                            dataKey="value"
                                        >
                                            {animalsByBreedData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                )}
                                {chartTypes.animalsByBreed === 'line' && (
                                    <LineChart width={400} height={300} data={animalsByBreedData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                                    </LineChart>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Animales por Estado</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Label>Chart Type</Label>
                                    <Select value={chartTypes.animalsByStatus} onValueChange={(value: 'bar' | 'pie' | 'line') => setChartTypes(prev => ({ ...prev, animalsByStatus: value }))}>
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
                                {chartTypes.animalsByStatus === 'bar' && (
                                    <BarChart width={400} height={300} data={animalsByStatusData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                )}
                                {chartTypes.animalsByStatus === 'pie' && (
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={animalsByStatusData}
                                            cx={200}
                                            cy={150}
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {animalsByStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                )}
                                {chartTypes.animalsByStatus === 'line' && (
                                    <LineChart width={400} height={300} data={animalsByStatusData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
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
                            <div className="flex items-center justify-between">
                                <CardTitle>Activos vs Inactivos</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Label>Chart Type</Label>
                                    <Select value={chartTypes.activeVsInactive} onValueChange={(value: 'bar' | 'pie' | 'line') => setChartTypes(prev => ({ ...prev, activeVsInactive: value }))}>
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
                                {chartTypes.activeVsInactive === 'bar' && (
                                    <BarChart width={400} height={300} data={activeVsInactiveData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                )}
                                {chartTypes.activeVsInactive === 'pie' && (
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={activeVsInactiveData}
                                            cx={200}
                                            cy={150}
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {activeVsInactiveData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                )}
                                {chartTypes.activeVsInactive === 'line' && (
                                    <LineChart width={400} height={300} data={activeVsInactiveData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                    </LineChart>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
