<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Path extends Model
{
    use HasFactory;
    protected $fillTable = [
        'name', 'image', 'aeon', 'aeon_img', 'pathDesc', 'mechDesc', 'desc',
    ];
    public function Character () {
        return $this->hasMany(Character::class);
    }
}
