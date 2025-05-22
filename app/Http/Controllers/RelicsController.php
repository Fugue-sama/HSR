<?php

namespace App\Http\Controllers;

use App\Models\Ornaments;
use App\Models\Relics;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RelicsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $relics = Relics::all();
        $ornaments = Ornaments::all();

        $relics = $relics->map(function ($item) {
            $item->type = 'relic';
            return $item;
        });
        $ornaments = $ornaments->map(function ($item) {
            $item->type = 'orament';
            return $item;
        });

        $merged = $relics->concat($ornaments)->sortBy('created_at')->values();

        return inertia('Relics', ['Relics' => $merged->toArray()]);
    }

    public function filter(Request $request)
    {
        $relicsAndOrnamentsKQ = $request->input('relics', []);
        $ornaments = $request->input('ornaments', []);  
    
        // Tách số từ input của ornaments
        $ornaments = array_map(function ($item) {
            $parts = explode(' ', $item);
            return $parts[1] ?? $parts[0]; 
        }, $ornaments);
    
        $queryRelics = Relics::query();
        $queryOrnaments = Ornaments::query();
        
        $queryInRelics = null;
        $queryInOrnaments = null;
    
        // Lặp qua ornaments và áp dụng các bộ lọc tương ứng
        if (!empty($ornaments)) {
            foreach ($ornaments as $setNum) {
                $setNum = (int) $setNum;
                if ($setNum == 2) {
                    // Lọc ornaments cho set_num = 2
                    $queryInOrnaments = $queryOrnaments->when(!empty($relicsAndOrnamentsKQ), function ($q) use ($relicsAndOrnamentsKQ) {
                        $q->where(function ($q2) use ($relicsAndOrnamentsKQ) {
                            foreach ($relicsAndOrnamentsKQ as $keyword) {
                                $keyword = strtolower(trim($keyword));
                                $q2->orWhere(function ($subQ) use ($keyword) {
                                    $subQ->whereRaw('LOWER(`set_two`) LIKE ?', ["%{$keyword}%"]);
                                });
                            }
                        });
                    });
                }
                if ($setNum == 4) {
                      // Lọc relics cho set_num = 4
                    $queryInRelics = $queryRelics->when(!empty($relicsAndOrnamentsKQ), function ($q) use ($relicsAndOrnamentsKQ) {
                        $q->where(function ($q2) use ($relicsAndOrnamentsKQ) {
                            foreach ($relicsAndOrnamentsKQ as $keyword) {
                                $keyword = strtolower(trim($keyword));
                                $q2->orWhere(function ($subQ) use ($keyword) {
                                    $subQ->whereRaw('LOWER(`set_two`) LIKE ?', ["%{$keyword}%"])
                                         ->orWhereRaw('LOWER(`set_four`) LIKE ?', ["%{$keyword}%"]);
                                });
                            }
                        });
                    });
                }
            }
        }
        else {
            $queryInRelics = $queryRelics->when(!empty($relicsAndOrnamentsKQ), function ($q) use ($relicsAndOrnamentsKQ) {
                $q->where(function ($q2) use ($relicsAndOrnamentsKQ) {
                    foreach ($relicsAndOrnamentsKQ as $keyword) {
                        $keyword = strtolower(trim($keyword));
                        $q2->orWhere(function ($subQ) use ($keyword) {
                            $subQ->whereRaw('LOWER(`set_two`) LIKE ?', ["%{$keyword}%"])
                                 ->orWhereRaw('LOWER(`set_four`) LIKE ?', ["%{$keyword}%"]);
                        });
                    }
                });
            });
            $queryInOrnaments = $queryOrnaments->when(!empty($relicsAndOrnamentsKQ), function ($q) use ($relicsAndOrnamentsKQ) {
                $q->where(function ($q2) use ($relicsAndOrnamentsKQ) {
                    foreach ($relicsAndOrnamentsKQ as $keyword) {
                        $keyword = strtolower(trim($keyword));
                        $q2->orWhere(function ($subQ) use ($keyword) {
                            $subQ->whereRaw('LOWER(`set_two`) LIKE ?', ["%{$keyword}%"]);
                        });
                    }
                });
            });
        }
        
        // Lấy dữ liệu sau khi đã áp dụng bộ lọc cho relics và ornaments
        $options = collect([]);
    
        if ($queryInRelics) {
            $options = $options->merge($queryInRelics->get());
        }
    
        if ($queryInOrnaments) {
            $options = $options->merge($queryInOrnaments->get());
        }
    
        return inertia('Relics', ['Relics' => $options]);
    }
    


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('RelicCreate');
        
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
            'set_four.required' => 'Không để trống mô tả.',
            'type.required' => 'Không để trống.',
            'suit.Head.required' => 'Vui lòng tải lên ảnh cho Nón.',
            'suit.Head.image' => 'Ảnh Nón phải là một hình ảnh.',
            'suit.Head.mimes' => 'Ảnh Nón phải có định dạng: jpeg,jpg,png.',
            'suit.Hands.required' => 'Vui lòng tải lên ảnh cho Găng tay.',
            'suit.Hands.image' => 'Ảnh Găng tay phải là một hình ảnh.',
            'suit.Hands.mimes' => 'Ảnh Găng tay phải có định dạng: jpeg,jpg,png.',
            'suit.Body.required' => 'Vui lòng tải lên ảnh cho Áo.',
            'suit.Body.image' => 'Ảnh Áo phải là một hình ảnh.',
            'suit.Body.mimes' => 'Ảnh Áo phải có định dạng: jpeg,jpg,png.',
            'suit.Feet.required' => 'Vui lòng tải lên ảnh cho Giày.',
            'suit.Feet.image' => 'Ảnh Giày phải là một hình ảnh.',
            'suit.Feet.mimes' => 'Ảnh Giày phải có định dạng: jpeg,jpg,png.',
        ];
    
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp',
            'set_two' => 'required|string',
            'set_four' => 'required|string',
            'type' => 'required|array',
            'suit.Head' => 'required|image|mimes:jpeg,jpg,png,webp',
            'suit.Hands' => 'required|image|mimes:jpeg,jpg,png,webp',
            'suit.Body' => 'required|image|mimes:jpeg,jpg,png,webp',
            'suit.Feet' => 'required|image|mimes:jpeg,jpg,png,webp',
        ], $messages);
    
        // Kiểm tra validation
        if ($validator->fails()) {
            return inertia('RelicCreate', [
                'errors' => $validator->errors(),
            ]);
        }
        $name = $request->name;
        // Upload ảnh chính (image)
        $cloudinary = new Cloudinary();
        $uploadImg = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => "Relics/{$name}"]);
        $filename = $uploadImg['public_id'];
        
        // Upload ảnh suit
        $suits = ['Head', 'Hands', 'Body', 'Feet'];
        $suitPaths = [];
    
        foreach ($suits as $suit) {
            if ($request->hasFile("suit.$suit")) {
                $uploadSuit = $cloudinary->uploadApi()->upload($request->file("suit.$suit")->getRealPath(), ['folder' => "Relics/{$name}"]);
                $suitPaths[$suit] = $uploadSuit['public_id'];  // Lưu lại public_id của ảnh suit
            }
        }
        // Lưu thông tin vào cơ sở dữ liệu
        Relics::create([
            'name' => $request->name,
            'image' => $filename,  // public_id của ảnh chính
            'set_two' => $request->set_two,
            'set_four' => $request->set_four,
            'type' => json_encode($request->type),  // Lưu các loại (type) dưới dạng JSON
            'suit' => json_encode($suitPaths),  // Lưu các ảnh suit dưới dạng JSON
        ]);
        
    
        // Chuyển hướng sau khi tạo thành công
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
        
        $relic = Relics::with(['characters:id,name,image'])->findOrFail($decodedID);
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
        $relic = Relics::with('characters:id,name')->findOrFail($decodedID);
        
        return inertia('RelicEdit', [
            'relic'=> $relic
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
        $relic = Relics::findOrFail($decodedID);
    
        $messages = [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi văn bản.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: :values.',
            'set_two.required' => 'Không để trống mô tả.',
            'set_four.required' => 'Không để trống mô tả.',
            'type.required' => 'Không để trống.',
            'suit.Head.required' => 'Vui lòng tải lên ảnh cho Nón.',
            'suit.Head.image' => 'Ảnh Nón phải là một hình ảnh.',
            'suit.Head.mimes' => 'Ảnh Nón phải có định dạng: jpeg,jpg,png.',
            'suit.Hands.required' => 'Vui lòng tải lên ảnh cho Găng tay.',
            'suit.Hands.image' => 'Ảnh Găng tay phải là một hình ảnh.',
            'suit.Hands.mimes' => 'Ảnh Găng tay phải có định dạng: jpeg,jpg,png.',
            'suit.Body.required' => 'Vui lòng tải lên ảnh cho Áo.',
            'suit.Body.image' => 'Ảnh Áo phải là một hình ảnh.',
            'suit.Body.mimes' => 'Ảnh Áo phải có định dạng: jpeg,jpg,png.',
            'suit.Feet.required' => 'Vui lòng tải lên ảnh cho Giày.',
            'suit.Feet.image' => 'Ảnh Giày phải là một hình ảnh.',
            'suit.Feet.mimes' => 'Ảnh Giày phải có định dạng: jpeg,jpg,png.',
        ];
    
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp',  // nullable cho phép không phải tải lên ảnh mới
            'set_two' => 'required|string',
            'set_four' => 'required|string',
            'type' => 'required|array',
            'suit.Head' => 'nullable|image|mimes:jpeg,jpg,png,webp', 
            'suit.Hands' => 'nullable|image|mimes:jpeg,jpg,png,webp', 
            'suit.Body' => 'nullable|image|mimes:jpeg,jpg,png,webp',  
            'suit.Feet' => 'nullable|image|mimes:jpeg,jpg,png,webp',  
        ], $messages);
        
        if ($validator->fails()) {
            $relic = Relics::with('characters:id,name')->findOrFail($decodedID);
            return inertia('RelicEdit', [
                'relic'=> $relic,
                'errors' => $validator->errors(),
            ]);
        }
    
        $name = $request->name;
        $cloudinary = new Cloudinary();
    
        $filename = $relic->image; 
    
        // Nếu có ảnh mới cho relic, hãy xóa ảnh cũ (nếu có)
        if ($request->hasFile('image')) {
            $oldImage = $relic->image;
            $cloudinary->uploadApi()->destroy($oldImage);  // Xóa ảnh cũ
            $uploadImg = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => "Relics/{$name}"]);
            $filename = $uploadImg['public_id'];  // Cập nhật filename mới
        }
    
        $suits = ['Head', 'Hands', 'Body', 'Feet'];
        $suitPaths = [];
        $originSuit = json_decode($relic->suit, true);
        foreach ($suits as $suit) {
            if ($request->hasFile("suit.$suit")) {

                // Xoá ảnh cũ
                if (isset($originSuit[$suit])) {
                    $cloudinary->uploadApi()->destroy($originSuit[$suit]);
                }
        
                // Upload ảnh mới
                $uploadSuit = $cloudinary->uploadApi()->upload(
                    $request->file("suit.$suit")->getRealPath(),
                    ['folder' => "Relics/{$name}"]
                );
                $suitPaths[$suit] = $uploadSuit['public_id'];
            } else {
                // Không có file mới => giữ ảnh cũ
                $suitPaths[$suit] =$originSuit[$suit] ?? null;
            }
        }
    
        $relic->update([
            'name' => $request->name,
            'image' => $filename, 
            'set_two' => $request->set_two,
            'set_four' => $request->set_four,
            'type' => json_encode($request->type), 
            'suit' => $suitPaths ?  json_encode($suitPaths) : $relic->suit, 
        ]);
    
        // Chuyển hướng sau khi cập nhật thành công
        return redirect()->route('relics.index')->with('success', 'Cập nhật thành công!');
    }
    

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hashids = new \Hashids\Hashids('salt', 8);
    
        $decoded = $hashids->decode($id);
        if (empty($decoded)) {
            abort(404);
        }
        $decodedID = $decoded[0];
    
        $relic = Relics::findOrFail($decodedID);
    
        $cloudinary = new Cloudinary();
    
        if (!empty($relic->image)) {
            $cloudinary->uploadApi()->destroy($relic->image);
        }
    
        $suitImages = json_decode($relic->suit, true);
        if (is_array($suitImages)) {
            foreach ($suitImages as $public_id) {
                if (!empty($public_id)) {
                    $cloudinary->uploadApi()->destroy($public_id);
                }
            }
        }
    
        $relic->delete();
    
        return redirect()->back()->with('success', 'Đã xóa thành công.');
    }
    
}
