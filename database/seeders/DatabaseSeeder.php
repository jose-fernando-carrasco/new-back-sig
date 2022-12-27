<?php

namespace Database\Seeders;

use App\Models\Diagrama;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        // $this->call(LineaSeeder::class);
        // $this->call(RecorridoSeeder::class);
        // $this->call(PuntoSeeder::class);

    }
}
