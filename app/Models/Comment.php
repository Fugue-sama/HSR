<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'character_id', 'content', 'image', 'parent_id'];

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function character()
    {
        return $this->belongsTo(Character::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
