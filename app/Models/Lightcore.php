<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lightcore extends Model
{
    use HasFactory;
    protected $fillable = [
        'name' , 'image', 'effect', 'rarity', 'hp',  'attack', 'defend', 'desc', 'path_id', 'roll','subtile'
    ];
    public function path(){
        return $this->belongsTo(Path::class);
    }
    public function characters() {
        return $this->belongsToMany(Character::class, 'character_lc', 'lightcore_id', 'character_id');
    }
    
   
}
