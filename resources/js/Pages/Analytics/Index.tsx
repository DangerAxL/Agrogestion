import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';

interface Lot {
    id: number;
    name: string;
}

interface Animal {
    id: number;
    caravana: string;
}

interface ChartData {
    datasets?: { data: number[] }[];
    labels?: string[];
}

interface GrowthData {
    weight?: ChartData;
}

const Index = () => {
    const [filters, setFilters] = useState({ date_from: '', date_to: '', lot_id: '', animal_id: '' });
    const [productionData, setProductionData] = useState<ChartData>({});
    const [growthData, setGrowthData] = useState<GrowthData>({});
    const [feedData, setFeedData] = useState<ChartData>({});
    const [lots, setLots] = useState<Lot[]>([]);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        axios.get('/api/analytics/lots').then(res => setLots(res.data));
        axios.get('/api/analytics/animals').then(res => setAnimals(res.data));
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(filters).toString();
        axios.get(`/api/analytics/production-trends?${params}`).then(res => setProductionData(res.data));
        axios.get(`/api/analytics/animal-growth?${params}`).then(res => setGrowthData(res.data));
        axios.get(`/api/analytics/feed-consumption?${params}`).then(res => setFeedData(res.data));
    }, [filters, refresh]);

    useEffect(() => {
        const interval = setInterval(() => setRefresh(r => r + 1), 300000);
        return () => clearInterval(interval);
    }, []);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const exportCsv = (endpoint: string, filename: string) => {
        const params = new URLSearchParams(filters).toString();
        const url = `/api/analytics/export/${endpoint}/csv?${params}`;
        window.open(url, '_blank');
    };

    const exportPdf = async (chartId: string, filename: string) => {
        const element = document.getElementById(chartId);
        if (element) {
            const imgData = await domtoimage.toPng(element);
            const pdf = new jsPDF();
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(filename);
        }
    };

    return (
        <>
            <Head title="Analytics" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Analítico</h1>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="date" value={filters.date_from} onChange={e => handleFilterChange('date_from', e.target.value)} className="border p-2" placeholder="Fecha desde" />
                    <input type="date" value={filters.date_to} onChange={e => handleFilterChange('date_to', e.target.value)} className="border p-2" placeholder="Fecha hasta" />
                    <select value={filters.lot_id} onChange={e => handleFilterChange('lot_id', e.target.value)} className="border p-2">
                        <option value="">Todos los lotes</option>
                        {lots.map(lot => <option key={lot.id} value={lot.id}>{lot.name}</option>)}
                    </select>
                    <select value={filters.animal_id} onChange={e => handleFilterChange('animal_id', e.target.value)} className="border p-2">
                        <option value="">Todos los animales</option>
                        {animals.map(animal => <option key={animal.id} value={animal.id}>{animal.caravana}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Tendencias de Producción</h2>
                            <div className="flex gap-2">
                                <button onClick={() => exportCsv('production-trends', 'production_trends.csv')} className="bg-blue-500 text-white px-3 py-1 rounded">CSV</button>
                                <button onClick={() => exportPdf('production-chart', 'production_trends.pdf')} className="bg-red-500 text-white px-3 py-1 rounded">PDF</button>
                            </div>
                        </div>
                        <div id="production-chart">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={productionData.datasets?.[0]?.data.map((d: number, i: number) => ({ label: productionData.labels?.[i] || '', value: d })) || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Crecimiento Animal</h2>
                            <div className="flex gap-2">
                                <button onClick={() => exportCsv('animal-growth', 'animal_growth.csv')} className="bg-blue-500 text-white px-3 py-1 rounded">CSV</button>
                                <button onClick={() => exportPdf('growth-chart', 'animal_growth.pdf')} className="bg-red-500 text-white px-3 py-1 rounded">PDF</button>
                            </div>
                        </div>
                        <div id="growth-chart">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={growthData.weight?.datasets?.[0]?.data.map((d: number, i: number) => ({ label: growthData.weight.labels?.[i] || '', value: d })) || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Consumo de Alimento</h2>
                            <div className="flex gap-2">
                                <button onClick={() => exportCsv('feed-consumption', 'feed_consumption.csv')} className="bg-blue-500 text-white px-3 py-1 rounded">CSV</button>
                                <button onClick={() => exportPdf('feed-chart', 'feed_consumption.pdf')} className="bg-red-500 text-white px-3 py-1 rounded">PDF</button>
                            </div>
                        </div>
                        <div id="feed-chart">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={feedData.datasets?.[0]?.data.map((d: number, i: number) => ({ label: feedData.labels?.[i] || '', value: d })) || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Reportes Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/reports/animals" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100">
                            <h3 className="font-medium text-blue-800">Reporte de Animales</h3>
                            <p className="text-sm text-blue-600">Inventario completo de animales con estadísticas.</p>
                        </Link>
                        <Link href="/reports/breeds" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100">
                            <h3 className="font-medium text-green-800">Reporte de Razas</h3>
                            <p className="text-sm text-green-600">Distribución de razas por lote.</p>
                        </Link>
                        <Link href="/reports/lots" className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100">
                            <h3 className="font-medium text-yellow-800">Reporte de Lotes</h3>
                            <p className="text-sm text-yellow-600">Estadísticas de lotes y animales.</p>
                        </Link>
                        <Link href="/reports/weighings" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100">
                            <h3 className="font-medium text-purple-800">Reporte de Pesajes</h3>
                            <p className="text-sm text-purple-600">Historial de pesajes de animales.</p>
                        </Link>
                        <Link href="/reports/feedings" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">
                            <h3 className="font-medium text-red-800">Reporte de Alimentación</h3>
                            <p className="text-sm text-red-600">Consumo de alimentos por lote y tipo.</p>
                        </Link>
                        <Link href="/reports/supplies" className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100">
                            <h3 className="font-medium text-indigo-800">Reporte de Suministros</h3>
                            <p className="text-sm text-indigo-600">Inventario de suministros disponibles.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;