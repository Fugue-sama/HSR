<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'image', 'faction', 'rarity', 'gameplay', 'skills', 'path_id', 'desc', 'stats' ,'souls', 'background' ,'materials', 'element_id', 'created_by', 'status'
    ];
// 'lightcore_id',

    public function element() {
        return $this->belongsTo(Element::class);
    }
    public function path(){
        return $this->belongsTo(Path::class);
    }
    public function relics(){
        return $this->belongsToMany(Relics::class, 'character_relic', 'character_id', 'relic_id');
    }
    public function ornaments(){
        return $this->belongsToMany(Ornaments::class, 'character_ornament', 'character_id', 'ornament_id');
    }
    public function lightcores() {
        return $this->belongsToMany(Lightcore::class, 'character_lc', 'character_id', 'lightcore_id');
    }
    public function creator() {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function comments()
{
    return $this->hasMany(Comment::class);
}

    protected $casts = [
        'souls' => 'array',
        'skills'=> 'array',
        'stats' => 'array',
    ];
}
