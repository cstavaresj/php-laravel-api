<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Band::create(['name' => 'Slipknot', 'gender' => 'Nu Metal']);
        \App\Models\Band::create(['name' => 'Nightwish', 'gender' => 'Symphonic Metal']);
        \App\Models\Band::create(['name' => 'System of a Down', 'gender' => 'Alternative Metal']);
    }
}
