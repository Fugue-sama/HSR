<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  
public function run(): void
    {
      User::create([
        'name'=> 'Mnestia',
        'email'=> 'mnestia@gmail.com',
        'avatar'=> null,
        'password' => bcrypt('123456'),
        'role'=> 'admin'
      ]); 
      User::create([
        'name'=> 'Kyo',
        'email'=> 'kyo@gmail.com',
        'password' => bcrypt('123456'),
        'avatar'=> null,
        'role'=> 'admin.super'
      ]); 
      User::create([
        'name'=> 'Ngủ mơ có Cas E6',
        'email'=> 'simplord@gmail.com',
        'avatar'=> null,
        'password' => bcrypt('123456'),
        'role'=> 'user'
      ]); 
      User::create([
        'name'=> 'nihongowakarimasen',
        'email'=> 'japango@gmail.com',
        'avatar'=> null,
        'password' => bcrypt('123456'),
        'role'=> 'user'
      ]); 
      
    }
}
