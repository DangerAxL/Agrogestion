import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as animalsIndex } from '@/routes/animals';
import { index as lotsIndex } from '@/routes/lots';
import { index as breedsIndex } from '@/routes/breeds';
import { index as feedTypesIndex } from '@/routes/feed-types';
import { index as suppliesIndex } from '@/routes/supplies';
import { index as weighingsIndex } from '@/routes/weighings';
import { index as feedingsIndex } from '@/routes/feedings';
import { index as medicalHistoriesIndex } from '@/routes/medical-histories';
import { index as veterinaryTreatmentsIndex } from '@/routes/veterinary-treatments';
import { index as healthAlertsIndex } from '@/routes/health-alerts';
import { index as reportsIndex } from '@/routes/reports';
import { index as usersIndex } from '@/routes/users';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Beef, MapPin, Tags, Wheat, Package, Scale, Utensils, Stethoscope, BarChart3, Users } from 'lucide-react';
import { route } from 'ziggy-js';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Animales',
        href: animalsIndex.url(),
        icon: Beef,
    },
    {
        title: 'Lotes',
        href: lotsIndex.url(),
        icon: MapPin,
    },
    {
        title: 'Razas',
        href: breedsIndex.url(),
        icon: Tags,
    },
    {
        title: 'Tipos de Alimento',
        href: feedTypesIndex.url(),
        icon: Wheat,
    },
    {
        title: 'Suministros',
        href: suppliesIndex.url(),
        icon: Package,
    },
    {
        title: 'Pesajes',
        href: weighingsIndex.url(),
        icon: Scale,
    },
    {
        title: 'Alimentaciones',
        href: feedingsIndex.url(),
        icon: Utensils,
    },
    {
        title: 'Historias Médicas',
        href: medicalHistoriesIndex.url(),
        icon: Stethoscope,
    },
    {
        title: 'Tratamientos Veterinarios',
        href: veterinaryTreatmentsIndex.url(),
        icon: Stethoscope,
    },
    {
        title: 'Alertas de Salud',
        href: healthAlertsIndex.url(),
        icon: Stethoscope,
    },
    {
        title: 'Reportes',
        href: reportsIndex.url(),
        icon: BookOpen,
    },
    {
        title: 'Analytics',
        href: route('analytics.index'),
        icon: BarChart3,
    },
    {
        title: 'Usuarios',
        href: usersIndex.url(),
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-pacific-blue-50 border-pacific-blue-200">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
