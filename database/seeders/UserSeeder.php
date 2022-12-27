<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Fernando Carrasco',
            'email' => 'Fer@gmail.com',
            'password' => bcrypt('1234'),
            'telefono' => '71029903'
        ])->assignRole('admin');
        
    }
}
