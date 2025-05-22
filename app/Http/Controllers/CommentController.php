<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
     {
         $validated = $request->validate([
             'content' => 'nullable|string',
             'image' => 'nullable|image|max:2048',
             'character_id' => 'required|exists:characters,id',
             'parent_id' => 'nullable|exists:comments,id',
         ]);
         
         $filename = null;
         if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary();
            $uploadRs = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder'=> 'Comments'
            ]);
            $filename = $uploadRs['public_id'];
            
         }
         Comment::create([
            'user_id' => auth()->id(),
            'character_id' => $validated['character_id'],
            'content' => $validated['content'],
            'parent_id' => $validated['parent_id'] ?? null,
            'image' => $filename ?? null,
         ]);
     
         return back();
     }
     

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'content' => 'nullable|string',
            'image' => 'nullable',
        ]);
        $comment = Comment::findOrFail($id);
        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary();
            $uploadResult = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder' => 'Comments'
            ]);
            $comment->image = $uploadResult['public_id'];
        }

        $comment->content = $validated['content'] ?? $comment->content;
        $comment->save();

        return back(); // hoặc redirect phù hợp
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
    
        // Kiểm tra quyền xóa bằng policy
        $this->authorize('delete', $comment);
    
        // Khởi tạo Cloudinary
        $cloudinary = new Cloudinary();
    
        // Lấy tất cả comment cha và các reply
        $commentsToDelete = Comment::where('id', $id)
            ->orWhere('parent_id', $id)
            ->get();
    
        // Xoá ảnh nếu có
        foreach ($commentsToDelete as $commentItem) {
            if (!empty($commentItem->image)) {
                $cloudinary->uploadApi()->destroy($commentItem->image);
            }
        }
        // Xoá các comment  
        Comment::whereIn('id', $commentsToDelete->pluck('id'))->delete();
    
        return back()->with('success', 'Xoá bình luận và ảnh thành công!');
    }
}
