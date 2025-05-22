<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comments = [
            [
            'user_id' => 3,
                'character_id' => 1,
                'content' => 'Cas cầm nón Bailu cũng ổn :))) đi kèm long tôn e6',
                'image' => 'z6600887834159_cd160183b3dbcaa1bf90e8a0d0c26e29_fihiu1', 
                'parent_id'=> null,
            ],
            [
                'user_id' => 4,
                'character_id' => 1,
                'content' => 'So Beautiful Honey',
                'image' => 'z6600887829107_361bc1ee81da409ffe43864e9924889c_mqtbjq',
                'parent_id'=> null,
            ],
        ];

        // Chèn dữ liệu vào bảng comments
        foreach ($comments as $comment) {
            Comment::create($comment);
        }
    }
}
