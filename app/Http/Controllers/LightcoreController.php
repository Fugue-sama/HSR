<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Lightcore;
use App\Models\Path;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LightcoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lightcores = Lightcore::all();
        $paths = Path::all();
    
        return inertia('Lightcores', compact('lightcores', 'paths'));
    }

    public function filter(Request $request)
    {
       if(!$request->all()) {
        return inertia('Lightcores', ['lightcores' => Lightcore::all(),'paths' => Path::all()
        ]);
       }
     
        $hashids = new \Hashids\Hashids('salt', 8); 

        // Lấy input
        $encodedPaths = $request->input('p', []);        // danh sách path hashid
        $rarityFilters = $request->input('r', []);        // danh sách rarity
        $effectKeyword = $request->input('c');            // từ khóa effect
        $rollInputs = $request->input('s', []); // ví dụ ['roll limit']

        // Lấy giá trị roll ('limit', 'both'...) từ chuỗi
        $rollValues = array_map(function($item) {
            $parts = explode(' ', $item);
            return $parts[1] ?? $parts[0];
        }, $rollInputs);

        // Giải mã path hashid
        $pathIds = [];
        foreach ((array) $encodedPaths as $encoded) {
            $decoded = $hashids->decode($encoded);
            if (!empty($decoded)) {
                $pathIds[] = $decoded[0];
            }
        }
        // Query
        $lightcores = Lightcore::query()
            ->when(!empty($rollValues), fn($q) => $q->whereIn('roll', $rollValues))
            ->when($effectKeyword, fn($q) => 
                $q->where(function ($query) use ($effectKeyword) {
                    foreach ($effectKeyword as $keyword) {
                        $query->orWhereRaw('LOWER(effect) LIKE ?', ['%' . strtolower($keyword) . '%']);
                }
            })            )
            ->when(!empty($pathIds), fn($q) => $q->whereIn('path_id', $pathIds))
            ->when(!empty($rarityFilters), fn($q) => $q->whereIn('rarity', $rarityFilters))
            ->distinct()
            ->get();
        
        return inertia('Lightcores', [
            'lightcores' => $lightcores,
            'paths' => Path::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paths = Path::all(['id', 'name', 'image']);
        $characters = Character::all(['id', 'name', 'image']);
    
        return inertia('LightcoreCreate', [
            'paths' => $paths,
            'characters' => $characters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [   
            // Tin nhắn tùy chỉnh cụ thể cho từng trường
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi văn bản.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: :values.',
            'effect.required' => 'Hiệu ứng là bắt buộc.',
            'rarity.required' => 'Loại nhân vật là bắt buộc.',
            'rarity.in' => 'Độ hiếm phải là 4 hoặc 5.',
            'hp.required' => 'HP là bắt buộc.',
            'hp.integer' => 'HP phải là một số nguyên.',
            'attack.required' => 'Tấn công là bắt buộc.',
            'attack.integer' => 'Tấn công phải là một số nguyên.',
            'defend.required' => 'Phòng thủ là bắt buộc.',
            'defend.integer' => 'Phòng thủ phải là một số nguyên.',
            'characters.*.exists' => 'Một hoặc nhiều nhân vật bạn chọn không tồn tại.',
        ];
        
        // Kiểm tra validation cho file ảnh
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp',
            'effect' => 'required|string',
            'rarity' => 'required|integer|in:4,5',
            'hp' => 'required|integer',
            'attack' => 'required|integer',
            'defend' => 'required|integer',
            'desc' => 'nullable|string',
            'path_id' => 'nullable|exists:paths,id',
            'characters' => 'nullable|array',
            'characters.*' => 'exists:characters,id',
            'roll' => 'nullable',
            'subtile' => 'nullable|string',
        ], $messages);
        
        if ($validator->fails()) {
            return inertia('LightcoreCreate', ['errors' => $validator->errors()->getMessages(),
            'old' => $request->old(),  'paths' =>Path::all(),
            'characters' => Character::all()]);
        }
        
        if (!$request->hasFile('image')) {
            return back()->withErrors(['image' => 'Hình ảnh là bắt buộc.']);
        }
        $validated = $validator->validated();
        // Xử lý upload ảnh lên Cloudinary
        $cloudinary = new Cloudinary();
        $uploadResult = $cloudinary->uploadApi()->upload($request->file(key: 'image')->getRealPath(), [
            'folder' => 'Lightcores',
        ]);
       // Lấy tên file từ URL
       $filename = $uploadResult['public_id'];


        // Tạo Lightcore mới
        $lightcore = Lightcore::create([
            'name' => $validated['name'],
            'image' => $filename,
            'effect' => $validated['effect'],
            'rarity' => $validated['rarity'],
            'hp' => $validated['hp'],
            'attack' => $validated['attack'],
            'defend' => $validated['defend'],
            'desc' => $validated['desc'] ?? null,
            'subtile' => $validated['subtile'] ?? 'default_value',
            'path_id' => $validated['path_id'] ?? null,
            'roll' =>$validated['roll'] ?? null,
        ]);
        // Gắn nhân vật nếu có
        if (!empty($validated['characters'])) {
            $lightcore->characters()->attach($validated['characters']);
        }

        return redirect()->route('lightcores.index')->with('success', 'Lightcore created successfully!');
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
        
        $lightcore = Lightcore::with(
            [
                'path' => fn($q) => $q->select('id', 'image', 'name'),
                'characters'=>fn($q) => $q->select('characters.id', 'characters.name', 'characters.image')
            ])->findOrFail($decodedID);
        return inertia('LightcoreDetail', ['lightcore' => $lightcore]);
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
        
        $paths = Path::all(['id', 'name', 'image']);
        $characters = Character::select('id', 'name', 'image')->get();
        $lightcore = Lightcore::with('characters:id,name')->findOrFail($decodedID);

        return inertia('LightcoreEdit', [
            'paths' => $paths,
            'characters' => $characters,
            'lightcore'=> $lightcore
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
        
        // Truy vấn lấy thông tin lightcore từ cơ sở dữ liệu
        $lightcore = Lightcore::findOrFail(id: $decodedID);

        $messages = [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi văn bản.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: :values.',
            'effect.required' => 'Hiệu ứng là bắt buộc.',
            'rarity.required' => 'Loại nhân vật là bắt buộc.',
            'rarity.in' => 'Độ hiếm phải là 4 hoặc 5.',
            'hp.required' => 'HP là bắt buộc.',
            'hp.integer' => 'HP phải là một số nguyên.',
            'attack.required' => 'Tấn công là bắt buộc.',
            'attack.integer' => 'Tấn công phải là một số nguyên.',
            'defend.required' => 'Phòng thủ là bắt buộc.',
            'defend.integer' => 'Phòng thủ phải là một số nguyên.',
            'characters.*.exists' => 'Một hoặc nhiều nhân vật bạn chọn không tồn tại.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'effect' => 'required|string',
            'rarity' => 'required|integer|in:4,5',
            'hp' => 'required|integer',
            'attack' => 'required|integer',
            'defend' => 'required|integer',
            'desc' => 'nullable|string',
            'path_id' => 'nullable|exists:paths,id',
            'characters' => 'nullable|array',
            'characters.*' => 'exists:characters,id',
            'roll' => 'nullable',
            'subtile' => 'nullable|string',
        ], $messages);

        if ($validator->fails()) {
            return inertia('LightcoreEdit', [
                'errors' => $validator->errors()->getMessages(),
                'old' => $request->old(),
                'paths' => Path::all(),
                'characters' => Character::all(),
                'lightcore'=> $lightcore
            ]);
        }

        $validated = $validator->validated();

        // Xử lý ảnh nếu có upload mới
        $filename = $lightcore->image; // giữ ảnh cũ mặc định
        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary();

            if($filename) $cloudinary->uploadApi()->destroy($filename);


            $uploadResult = $cloudinary->uploadApi()->upload(
                $request->file('image')->getRealPath(),
                ['folder' => 'Lightcores']
            );
            $filename = $uploadResult['public_id'];
        }

        // Cập nhật lightcore
        $lightcore->update([
            'name' => $validated['name'],
            'image' => $filename,
            'effect' => $validated['effect'],
            'rarity' => $validated['rarity'],
            'hp' => $validated['hp'],
            'attack' => $validated['attack'],
            'defend' => $validated['defend'],
            'desc' => $validated['desc'] ?? null,
            'subtile' => $validated['subtile'] ?? 'default_value',
            'path_id' => $validated['path_id'] ?? null,
            'roll' => $validated['roll'] ?? null,
        ]);

        // Đồng bộ nhân vật (xóa cái cũ, thêm cái mới)
        $lightcore->characters()->sync($validated['characters'] ?? []);

        return redirect()->route('lightcores.index')->with('success', 'Cập nhật Lightcore thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cloudinary = new Cloudinary();
        $hashids = new \Hashids\Hashids('salt', 8); 
        if (!$hashids->decode($id)) {
        abort(404);
        }
        $decodedID = $hashids->decode($id)[0];
        $lightcore = Lightcore::findOrFail($decodedID);
        if ($lightcore->image) {
            $cloudinary = new Cloudinary();
            try {
                $cloudinary->uploadApi()->destroy($lightcore->image);
            } catch (\Exception $e) {
                logger()->error("Không thể xoá ảnh Cloudinary: " . $e->getMessage());
            }
        }
        $lightcore->delete();
        return redirect()->back()->with('success', 'Đã xóa thành công.');

    }
}
