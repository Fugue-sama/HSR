<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        Material::create([
            'name' => 'Khóc Than Vô Tận',
            'image' => [
                'level1' => 'wood_lv1.png',
                'level2' => 'wood_lv2.png',
                'level3' => 'wood_lv3.png'
            ]
        ]);
    }
}
