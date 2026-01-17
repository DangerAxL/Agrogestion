import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { index as animalsIndex } from '@/routes/animals';
import { index as lotsIndex } from '@/routes/lots';
import { index as breedsIndex } from '@/routes/breeds';
import { index as feedTypesIndex } from '@/routes/feed-types';
import { index as suppliesIndex } from '@/routes/supplies';
import { index as weighingsIndex } from '@/routes/weighings';
import { index as feedingsIndex } from '@/routes/feedings';
import { index as reportsIndex } from '@/routes/reports';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const modules = [
    {
        name: 'Animales',
        description: 'Gestión completa del ciclo de vida de los animales',
        url: animalsIndex.url(),
        icon: '🐄',
    },
    {
        name: 'Lotes',
        description: 'Administración de lotes y capacidad',
        url: lotsIndex.url(),
        icon: '🏞️',
    },
    {
        name: 'Razas',
        description: 'Catálogo de razas de ganado',
        url: breedsIndex.url(),
        icon: '🏷️',
    },
    {
        name: 'Tipos de Alimento',
        description: 'Gestión de tipos de alimentación',
        url: feedTypesIndex.url(),
        icon: '🌾',
    },
    {
        name: 'Suministros',
        description: 'Inventario de suministros sanitarios y alimenticios',
        url: suppliesIndex.url(),
        icon: '📦',
    },
    {
        name: 'Pesajes',
        description: 'Registro y seguimiento de pesajes',
        url: weighingsIndex.url(),
        icon: '⚖️',
    },
    {
        name: 'Alimentaciones',
        description: 'Control de raciones y alimentación',
        url: feedingsIndex.url(),
        icon: '🍽️',
    },
    {
        name: 'Reportes',
        description: 'Análisis y reportes del sistema',
        url: reportsIndex.url(),
        icon: '📊',
    },
];

interface Props {
    stats: {
        totalAnimals: number;
        activeAnimals: number;
        totalLots: number;
        totalSupplies: number;
        averageWeight: number;
        feedingsThisWeek: number;
        feedingsThisMonth: number;
        efficiency: number;
    };
}

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Sistema de Gestión Feedlot</h1>
                        <p className="text-muted-foreground">Panel de Control Principal - Gestiona tu ganado de manera eficiente</p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="border-pacific-blue-200 bg-white/90 backdrop-blur-sm aspect-video">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-ash-grey-800 flex items-center space-x-2">
                                <span className="text-2xl">🐄</span>
                                <span>Estadísticas de Animales</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-pacific-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Total de Animales</span>
                                    <span className="font-bold text-xl text-pacific-blue-600">{stats.totalAnimals}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-frosted-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Animales Activos</span>
                                    <span className="font-bold text-xl text-frosted-blue-600">{stats.activeAnimals}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-almond-cream-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Promedio de Peso</span>
                                    <span className="font-bold text-xl text-almond-cream-600">{stats.averageWeight} kg</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-pacific-blue-200 bg-white/90 backdrop-blur-sm aspect-video">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-ash-grey-800 flex items-center space-x-2">
                                <span className="text-2xl">🌾</span>
                                <span>Consumo de Alimento</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-pacific-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Esta Semana</span>
                                    <span className="font-bold text-xl text-pacific-blue-600">{stats.feedingsThisWeek} kg</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-frosted-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Este Mes</span>
                                    <span className="font-bold text-xl text-frosted-blue-600">{stats.feedingsThisMonth} kg</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-almond-cream-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Eficiencia</span>
                                    <span className="font-bold text-xl text-almond-cream-600">{stats.efficiency}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-pacific-blue-200 bg-white/90 backdrop-blur-sm aspect-video">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-ash-grey-800 flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <span>Resumen del Sistema</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-gradient-to-r from-pacific-blue-100 to-frosted-blue-100 rounded-lg">
                                    <div className="text-2xl font-bold text-pacific-blue-600 mb-1">
                                        {stats.activeAnimals > 0 ? Math.round((stats.activeAnimals / stats.totalAnimals) * 100) : 0}%
                                    </div>
                                    <div className="text-sm text-ash-grey-600">Tasa de Actividad</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-r from-frosted-blue-100 to-almond-cream-100 rounded-lg">
                                    <div className="text-2xl font-bold text-frosted-blue-600 mb-1">
                                        {stats.feedingsThisMonth > 0 ? Math.round(stats.feedingsThisMonth / stats.totalAnimals) : 0}
                                    </div>
                                    <div className="text-sm text-ash-grey-600">kg/Alimento por Animal</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-pacific-blue-200 bg-white/90 backdrop-blur-sm aspect-video">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-ash-grey-800 flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <span>Estadísticas Generales</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-pacific-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Total de Lotes</span>
                                    <span className="font-bold text-xl text-pacific-blue-600">{stats.totalLots}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-frosted-blue-50 rounded-lg">
                                    <span className="text-ash-grey-600 font-medium">Total de Suministros</span>
                                    <span className="font-bold text-xl text-frosted-blue-600">{stats.totalSupplies}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </AppLayout>
    );
}