<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // Animals
            'view animals',
            'create animals',
            'edit animals',
            'delete animals',

            // Lots
            'view lots',
            'create lots',
            'edit lots',
            'delete lots',

            // Breeds
            'view breeds',
            'create breeds',
            'edit breeds',
            'delete breeds',

            // Weighings
            'view weighings',
            'create weighings',
            'edit weighings',
            'delete weighings',

            // Health Records
            'view health records',
            'create health records',
            'edit health records',
            'delete health records',

            // Supplies
            'view supplies',
            'create supplies',
            'edit supplies',
            'delete supplies',

            // Feed Types
            'view feed types',
            'create feed types',
            'edit feed types',
            'delete feed types',

            // Feedings
            'view feedings',
            'create feedings',
            'edit feedings',
            'delete feedings',

            // Reports
            'view reports',

            // Users
            'view users',
            'create users',
            'edit users',
            'delete users',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $productorRole = Role::firstOrCreate(['name' => 'PRODUCTOR']);
        $adminRole = Role::firstOrCreate(['name' => 'ADMIN']);
        $veterinarioRole = Role::firstOrCreate(['name' => 'VETERINARIO']);

        // Assign permissions to roles
        $productorRole->syncPermissions([
            'view animals', 'create animals', 'edit animals', 'delete animals',
            'view lots', 'create lots', 'edit lots', 'delete lots',
            'view breeds', 'create breeds', 'edit breeds', 'delete breeds',
            'view weighings', 'create weighings', 'edit weighings', 'delete weighings',
            'view health records', 'create health records', 'edit health records', 'delete health records',
            'view supplies', 'create supplies', 'edit supplies', 'delete supplies',
            'view feed types', 'create feed types', 'edit feed types', 'delete feed types',
            'view feedings', 'create feedings', 'edit feedings', 'delete feedings',
            'view reports',
            'view users', 'create users', 'edit users', 'delete users',
        ]);

        $adminRole->syncPermissions($permissions); // All permissions

        $veterinarioRole->syncPermissions([
            'view animals', 'edit animals',
            'view lots',
            'view breeds',
            'view weighings', 'create weighings', 'edit weighings',
            'view health records', 'create health records', 'edit health records', 'delete health records',
            'view supplies',
            'view feed types',
            'view feedings',
            'view reports',
        ]);
    }
}
