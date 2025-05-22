<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    use HasFactory;
    protected $fillTable = [
        'name', 'image_id', 'description', 'damage', 'debuff', 'dot'
    ];

    public function Character () {
        return $this->hasMany(Character::class);
    }
}
