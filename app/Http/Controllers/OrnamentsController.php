<?php

namespace App\Http\Controllers;

use App\Models\Ornaments;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrnamentsController extends Controller
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
        return inertia('OrnamentCreate');
    }

/**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi văn bản.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: :values.',
            'set_two.required' => 'Không để trống mô tả.',
            'type.required' => 'Không để trống.',
            'type.array' => 'Phải là mảng.',
            'suit.PS.required' => 'Yêu cầu ảnh cho Cầu.',
            'suit.PS.image' => 'Ảnh Cầu phải là hình ảnh.',
            'suit.PS.mimes' => 'Ảnh Cầu phải có định dạng: jpeg,jpg,png.',
            'suit.LR.required' => 'Vui lòng tải lên ảnh cho Dây.',
            'suit.LR.image' => 'Ảnh Dây phải là hình ảnh.',
            'suit.LR.mimes' => 'Ảnh Dây phải có định dạng: jpeg,jpg,png.',
        ];
    
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp',
            'set_two' => 'required|string',
            'type' => 'required|array',
            'suit.PS' => 'required|image|mimes:jpeg,jpg,png,webp',
            'suit.LR' => 'required|image|mimes:jpeg,jpg,png,webp',
        ], $messages);
    
        if ($validator->fails()) {
            return inertia('OrnamentCreate', [
                'errors' => $validator->errors(),
            ]);
        }
    
        $name = $request->name;
    
        // Upload ảnh chính (image)
        $cloudinary = new Cloudinary();
        $uploadImg = $cloudinary->uploadApi()->upload(
            $request->file('image')->getRealPath(),
            ['folder' => "Ornaments/{$name}"]
        );
        $filename = $uploadImg['public_id'];
    
        // Upload ảnh suit (PS và LR)
        $suitKeys = ['PS', 'LR'];
        $suitPaths = [];
    
        foreach ($suitKeys as $suit) {
            if ($request->hasFile("suit.$suit")) {
                $uploadSuit = $cloudinary->uploadApi()->upload(
                    $request->file("suit.$suit")->getRealPath(),
                    ['folder' => "Ornaments/{$name}"]
                );
                $suitPaths[$suit] = $uploadSuit['public_id'];
            }
        }
    
        // Lưu vào cơ sở dữ liệu
        Ornaments::create([
            'name' => $request->name,
            'image' => $filename,
            'set_two' => $request->set_two,
            'set_four' => $request->set_four,
            'type' => json_encode($request->type),
            'suit' => json_encode($suitPaths),
        ]);
    
        return redirect()->route('relics.index')->with('success', 'Tạo thành công!');
    }
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $hashids = new \Hashids\Hashids('salt', 8); 
        if (!$hashids->decode($id)) {
        abort(404);
        }
        $decodedID = $hashids->decode($id)[0];
        
        $relic = Ornaments::with(['characters:id,name,image'])->findOrFail($decodedID);
        return inertia('RelicDetail', ['relic' => $relic]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $hashids = new \Hashids\Hashids('salt', 8); 
        if (!$hashids->decode($id)) {
        abort(404);
        }
        $decodedID = $hashids->decode($id)[0];
        $ornament = Ornaments::with('characters:id,name')->findOrFail($decodedID);
        
        return inertia('OrnamentEdit', [
            'ornament'=> $ornament
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hashids = new \Hashids\Hashids('salt', 8); 
        if (!$hashids->decode($id)) {
            abort(404);
        }
        $decodedID = $hashids->decode($id)[0];
        $ornament = Ornaments::findOrFail($decodedID);

        $messages = [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi văn bản.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: :values.',
            'set_two.required' => 'Không để trống mô tả.',
            'type.required' => 'Không để trống.',
            'type.array' => 'Phải là mảng.',
            'suit.PS.required' => 'Yêu cầu ảnh cho Cầu.',
            'suit.PS.image' => 'Ảnh Cầu phải là hình ảnh.',
            'suit.PS.mimes' => 'Ảnh Cầu phải có định dạng: jpeg,jpg,png.',
            'suit.LR.required' => 'Vui lòng tải lên ảnh cho Dây.',
            'suit.LR.image' => 'Ảnh Dây phải là hình ảnh.',
            'suit.LR.mimes' => 'Ảnh Dây phải có định dạng: jpeg,jpg,png.',
        ];
    
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp',
            'set_two' => 'required|string',
            'type' => 'nullable|array',
            'suit.PS' => 'nullable|image|mimes:jpeg,jpg,png,webp',
            'suit.LR' => 'nullable|image|mimes:jpeg,jpg,png,webp',
        ], $messages);
        
        if ($validator->fails()) {
            $ornament = Ornaments::with('characters:id,name')->findOrFail($decodedID);
            return inertia('OrnamentEdit', [
                'ornament'=> $ornament,
                'errors' => $validator->errors()
            ]);
        }
        $name = $request->name;
        $cloudinary = new Cloudinary();
    
        $filename = $ornament->image; 
       
        // Nếu có ảnh mới cho relic, hãy xóa ảnh cũ (nếu có)
        if ($request->hasFile('image')) {
            $oldImage = $ornament->image;
            $cloudinary->uploadApi()->destroy($oldImage);  // Xóa ảnh cũ
            $uploadImg = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => "Ornaments/{$name}"]);
            $filename = $uploadImg['public_id'];  // Cập nhật filename mới
        }

        $suits =['PS', 'LR'];
        $suitPaths = [];
        $originSuit = json_decode($ornament->suit, true);

        foreach ($suits as $suit) {
            if ($request->hasFile("suit.$suit")) {

                // Xoá ảnh cũ
                if (isset($originSuit[$suit])) {
                    $cloudinary->uploadApi()->destroy($originSuit[$suit]);
                }
        
                // Upload ảnh mới
                $uploadSuit = $cloudinary->uploadApi()->upload(
                    $request->file("suit.$suit")->getRealPath(),
                    ['folder' => "Ornaments/{$name}"]
                );
                $suitPaths[$suit] = $uploadSuit['public_id'];
            } else {
                // Không có file mới => giữ ảnh cũ
                $suitPaths[$suit] =$originSuit[$suit] ?? null;
            }
        }
        $ornament->update([
            'name' => $request->name,
            'image' => $filename, 
            'set_two' => $request->set_two,
            'type' => json_encode($request->type), 
            'suit' => $suitPaths ?  json_encode($suitPaths) : $ornament->suit, 
        ]);
        return redirect()->route('relics.index')->with('success', 'Cập nhật thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hashids = new \Hashids\Hashids('salt', 8); 
        if (!$hashids->decode($id)) {
            abort(404);
        }
        $decodedID = $hashids->decode($id)[0];
    
        $cloudinary = new Cloudinary();
        $ornament = Ornaments::findOrFail($decodedID);

        // Xóa ảnh chính
        if ($ornament->image) {
            $cloudinary->uploadApi()->destroy($ornament->image);
        }

        // Xóa ảnh trong suit (decode json để lấy public_id từng ảnh)
        $suitImages = json_decode($ornament->suit, true);
        if (is_array($suitImages)) {
            foreach ($suitImages as $public_id) {
                if ($public_id) {
                    $cloudinary->uploadApi()->destroy($public_id);
                }
            }
        }

        // Xóa dữ liệu ornament khỏi database
        $ornament->delete();

        return redirect()->back()->with('success', 'Đã xóa thành công.');
    }

}
