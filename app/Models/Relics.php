<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relics extends Model
{
    use HasFactory;
    protected $fillable = [
       'name', 'image', 'set_two', 'set_four', 'suit', 'type'
    ];
    public function characters() {
        return $this->belongsToMany(Character::class, 'character_relic', 'relic_id', 'character_id');
    }
    protected $casts = [
        'suit' => 'array',
        'type' => 'array'
    ];
}
