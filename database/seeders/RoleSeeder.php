<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin  = Role::create(['name' => 'admin']);
    
        Permission::create(['name' => 'users.index'])->assignRole($admin);
        Permission::create(['name' => 'users.destroy'])->assignRole($admin);

    }
}
