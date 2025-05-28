<?php

namespace App\Http\Controllers;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // Hiển thị trang profile với dữ liệu user
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'data'=> $user
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable',
        ]);
        if ($request->hasFile('avatar')) {
            $cloudinary = new Cloudinary();
            // Xóa avatar cũ nếu có
            if ($user->avatar) {
                $publicId = pathinfo(parse_url($user->avatar, PHP_URL_PATH), PATHINFO_FILENAME);
                $cloudinary->uploadApi()->destroy("Avatars/" . $publicId);
            }

            $uploadRs = $cloudinary->uploadApi()->upload(
                $request->file('avatar')->getRealPath(),
                ['folder' => 'Avatars']
            );
            $validated['avatar'] = $uploadRs['secure_url'];
        }
        $user->update($validated);

        return redirect()->back()->with('success', 'Cập nhật hồ sơ thành công!');
    }

    
}
