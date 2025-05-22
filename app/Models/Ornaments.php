<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ornaments extends Model
{
    use HasFactory;
     
        protected $fillable = [
            'name', 'image', 'set_two', 'suit', 'type'
        ];

        public function characters() {
            return $this->belongsToMany(Character::class, 'character_ornament', 'ornament_id', 'character_id');
        }
    
        protected $casts = [
            'suit'=> 'array',
            'type'=> 'array'
        ];
}
