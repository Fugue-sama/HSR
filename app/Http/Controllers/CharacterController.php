<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Element;
use App\Models\Lightcore;
use App\Models\Ornaments;
use App\Models\Path;
use App\Models\Relics;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $paths = $this->hashCollection(Path::all());
        $elements =  $this->hashCollection(Element::all());

        $characters = $this->hashCollection(Character::all());

        return inertia('Characters', ['elements' => $elements, 'paths' => $paths, 'characters' => $characters]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paths = Path::all(['id', 'name', 'image']);
        $elements = Element::all(['id', 'name', 'image_id']);
        $relics = Relics::all(['id', 'name', 'image']);
        $ornaments = Ornaments::all(['id', 'name', 'image']);
        $lightcores = Lightcore::all(['id', 'name', 'image']);


        return inertia('CreateCharacter', [
            'paths' => $paths,
            'elements' => $elements,
            'relics' => $relics,
            'ornaments' => $ornaments,
            'lightcores' => $lightcores,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cloudinary = new Cloudinary();
        $rules = [
            'name' => 'required|string|max:255',
            'faction' => 'nullable|string|max:255',
            'gameplay' => 'nullable|string|max:255',
            'desc'=>'nullable|string|max:255',
            'rarity' => 'required|integer|in:4,5',
            'path_id' => 'required|integer',
            'element_id' => 'required|exists:elements,id',
            'background' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'skills' => 'required|array',
            'skills.basis.name' => 'required|string|max:255',
            'skills.basis.desc' => 'required|string|max:255',

            'skills.skill.name' => 'required|string|max:255',
            'skills.skill.desc' => 'required|string|max:255',

            'skills.ultimate.name' => 'required|string|max:255',
            'skills.ultimate.desc' => 'required|string|max:255',

            'skills.talent.name' => 'required|string|max:255',
            'skills.talent.desc' => 'required|string|max:255',

            'skills.technique.name' => 'required|string|max:255',
            'skills.technique.desc' => 'required|string|max:255',

            'stats' => 'required|array',
            'stats.hp' => 'required|integer|min:0|max:9999',
            'stats.attack' => 'required|integer|min:0|max:9999',
            'stats.defend' => 'required|integer|min:0|max:9999',
            'stats.speed' => 'required|numeric|min:0|max:999',
            'stats.taunt' => 'required|numeric|min:0|max:999',
            'souls' => 'required|array|max:6',
            'souls.*.name' => 'required|string|max:255',
            'souls.*.desc' => 'required|string',
        ];
    
        $messages = [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là chuỗi.',
            'background.image' => 'Ảnh nền phải là file ảnh.',
            'imagae.image' => 'Ảnh nền phải là file ảnh.',
            'name.max' => 'Tên tối đa 255 ký tự.',
            'rarity.required' => 'Cấp độ bắt buộc.',
            'path_id.required' => 'Vận mệnh bắt buộc.',
            'element_id.required' => 'Nguyên tố bắt buộc.',
            'skills.required' => 'Kỹ năng bắt buộc.',
            'stats.required' => 'Chỉ số bắt buộc.',
            'skills.*.name.required' => 'Kỹ năng bắt buộc.',
            'stats.*.required' => 'Chỉ số bắt buộc.',
            'souls.*.name.required' => 'Tinh hồn bắt buộc.',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            $paths = Path::all(['id', 'name', 'image']);
            $elements = Element::all(['id', 'name', 'image_id']);
            $relics = Relics::all(['id', 'name', 'image']);
            $ornaments = Ornaments::all(['id', 'name', 'image']);
            $lightcores = Lightcore::all(['id', 'name', 'image']);
    
            return inertia('CreateCharacter', [
                'paths' => $paths,
                'elements' => $elements,
                'relics' => $relics,
                'ornaments' => $ornaments,
                'lightcores' => $lightcores,
                'errors' => $validator->errors()->getMessages(),
                'old' => $request->old()
            ]);
        }
    
        $validated = $validator->validated();
    
        $skillFiles = $request->file('skills');
        $soulsFiles = $request->file('souls');
    
        $skillsToStore = [];
        $soulsToStore = [];
    
        $characterName = (string) $validated["name"];
    
        foreach($validated['souls'] as $type => $soul) {
            $soulSave = [
                'name' => $soul['name'] ?? null,
                'desc' => $soul['desc'] ?? null,
            ];
            if(isset($soulsFiles[$type]['image'])) {
                $uploadRs = $cloudinary->uploadApi()->upload(
                    $soulsFiles[$type]['image']->getRealPath(),
                    ['folder'=>"Characters/{$characterName}"]
                );
                $soulSave['image'] = $uploadRs['public_id'];
            }
            $soulsToStore[$type] = $soulSave;
        }
        foreach($validated['skills'] as $type => $skill) {
            $skillsSave = [
                'name' => $skill['name'] ?? null,
                'desc' => $skill['desc'] ?? null,
            ];
            if(isset($skillFiles[$type]['image'])) {
                $uploadRs = $cloudinary->uploadApi()->upload(
                    $skillFiles[$type]['image']->getRealPath(),
                    ['folder'=>"Characters/{$characterName}"]
                );
                $skillsSave['image'] = $uploadRs['public_id'];
            }
            if(isset($skillFiles[$type]['gif'])) {
                $uploadRs = $cloudinary->uploadApi()->upload(
                    $skillFiles[$type]['gif']->getRealPath(),
                    ['folder'=>"Characters/{$characterName}"]
                );
                $skillsSave['gif'] = $uploadRs['public_id'];
            }
            $skillsToStore[$type] = $skillsSave;
        }
    
        $backgroundImage = null;
        if ($request->hasFile('background')) {
            $backgroundImage = $cloudinary->uploadApi()->upload(
                $request->file('background')->getRealPath(),
                ['folder' => "Characters/{$characterName}"]
            );
            $backgroundImage = $backgroundImage['public_id'];
        }
        $filenameImg  = null;
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $cloudinary->uploadApi()->upload(
                $request->file('image')->getRealPath(),
                ['folder' => "Characters/{$characterName}"]
            );
            $filenameImg = $image['public_id'];
        }
        // tao moi
        $char = Character::create([
            'name'=> $characterName,
            'desc'=> $validated['desc'] ?? null,
            'image'=>$filenameImg,
            'background' => $backgroundImage,
            'faction'=> $validated['faction'] ?? null,
            'gameplay' => $validated['gameplay'],
            'rarity'=> $validated['rarity'] ?? null,
            'path_id' => $validated['path_id'],
            'element_id' => $validated['element_id'],
            'skills' => json_encode($skillsToStore, JSON_UNESCAPED_UNICODE),
            'stats' => $validated['stats'],
            'souls' => json_encode($soulsToStore, JSON_UNESCAPED_UNICODE),
            'created_by' => auth()->id(),
        ]);
    
        if($request->has('ornaments')) $char->ornaments()->syncWithoutDetaching($request->input('ornaments'));
        if($request->has('relics')) $char->relics()->syncWithoutDetaching($request->input( 'relics'));
        if($request->has('lightcores')) $char->lightcores()->syncWithoutDetaching($request->input('lightcores'));
        return redirect()->route('characters.index')->with('success', 'Tạo nhân vật thành công!');
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

        $character = Character::with([
            'path' => fn($q) => $q->select('id', 'image', 'name'),
            'element' => fn($q) => $q->select('id', 'image_id', 'name'),
            'relics' => fn($q) => $q->select('relics.id', 'image', 'name', 'set_two', 'set_four'),
            'ornaments' => fn($q) => $q->select('ornaments.id', 'image', 'name', 'set_two'),
            'lightcores' => fn($q) => $q->select('lightcores.id', 'image', 'name', 'effect'),
            'comments' => fn($q) => $q->select('id', 'user_id', 'character_id', 'content', 'image', 'created_at', 'parent_id')
                ->whereNull('parent_id') // chỉ lấy comment cha
                ->orderByDesc('created_at')
                ->with([
                    'user' => fn($q) => $q->select('id', 'name', 'avatar', 'role'),
                    'replies' => fn($q) => $q->select('id', 'user_id', 'character_id', 'content', 'image', 'created_at', 'parent_id')
                        ->orderBy('created_at')
                        ->with('user:id,name,avatar')
                ])
        ])->findOrFail($decodedID);

        return inertia('CharacterDetail', ['character' => $character]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $hashids = new \Hashids\Hashids('salt', 8);
        $decoded = $hashids->decode($id);

        if (!$decoded) {
            abort(404);
        }

        $decodedID = $decoded[0];

        $character = Character::with([
            'element:id,name',
            'path:id,name',
            'relics:id,name,image',
            'ornaments:id,name,image',
            'lightcores:id,name,image',
        ])->findOrFail($decodedID);

        if (!$character) {
            abort(404);
        }
        $paths = Path::get();
        $elements = Element::get();
        $relics = Relics::all(['id', 'name', 'image']);
        $ornaments = Ornaments::all(['id', 'name', 'image']);
        $lightcores = Lightcore::all(['id', 'name', 'image']);


        return inertia('EditCharacter', [
            'character' => $character,
            'paths' => $paths,
            'elements' => $elements,
            'relics' => $relics,
            'ornaments' => $ornaments,
            'lightcores' => $lightcores,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cloudinary = new Cloudinary();
        $rules = [
            'name' => 'required|string|max:255',
            'faction' => 'nullable|string|max:255',
            'gameplay' => 'nullable|string|max:255',
            'desc' => 'nullable|string|max:525',
            'rarity' => 'required|integer|in:4,5',
            'path_id' => 'required|integer',
            'element_id' => 'required|exists:elements,id',
    
            // background: nếu có file thì phải là ảnh, không kiểm tra kiểu string nữa
            'background' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    
            // image: nếu có file thì phải là ảnh
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    
            // Stats
            'stats' => 'required|array',
            'stats.hp' => 'required|integer|min:0|max:9999',
            'stats.attack' => 'required|integer|min:0|max:9999',
            'stats.defend' => 'required|integer|min:0|max:9999',
            'stats.speed' => 'required|numeric|min:0|max:999',
            'stats.taunt' => 'required|numeric|min:0|max:999',
    
            // Souls
            'souls' => 'required|array|max:6',
            'souls.*.name' => 'required|string|max:255',
            'souls.*.desc' => 'required|string',
            'souls.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
    
            // Skills: image và gif bắt buộc phải là file ảnh/gif nếu có, không hỗ trợ string
            'skills' => 'nullable|array',
            'skills.*.name' => 'nullable|string|max:255',
            'skills.*.desc' => 'nullable|string',
            'skills.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'skills.*.gif' => 'nullable|file|mimes:gif|max:10240',
        ];
        $messages = [
            // name
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là chuỗi.',
            'name.max' => 'Tên tối đa 255 ký tự.',

            // faction, gameplay, desc (nếu cần)
            'faction.string' => 'Faction phải là chuỗi.',
            'faction.max' => 'Faction tối đa 255 ký tự.',
            'gameplay.string' => 'Gameplay phải là chuỗi.',
            'gameplay.max' => 'Gameplay tối đa 255 ký tự.',
            'desc.string' => 'Mô tả phải là chuỗi.',
            'desc.max' => 'Mô tả tối đa 525 ký tự.',

            // background
            'background.image' => 'Ảnh nền phải là file ảnh hợp lệ.',
            'background.mimes' => 'Ảnh nền chỉ chấp nhận các định dạng jpeg, png, jpg, gif, webp.',
            'background.max' => 'Ảnh nền không được vượt quá 10MB.',

            // image
            'image.image' => 'Ảnh đại diện phải là file ảnh hợp lệ.',
            'image.mimes' => 'Ảnh đại diện chỉ chấp nhận các định dạng jpeg, png, jpg, gif, webp.',
            'image.max' => 'Ảnh đại diện không được vượt quá 10MB.',

            // rarity, path_id, element_id
            'rarity.required' => 'Cấp độ bắt buộc.',
            'rarity.integer' => 'Cấp độ phải là số nguyên.',
            'rarity.in' => 'Cấp độ phải là 4 hoặc 5.',

            'path_id.required' => 'Vận mệnh bắt buộc.',
            'path_id.integer' => 'Vận mệnh phải là số nguyên.',

            'element_id.required' => 'Nguyên tố bắt buộc.',
            'element_id.exists' => 'Nguyên tố không hợp lệ.',

            // stats
            'stats.required' => 'Chỉ số bắt buộc.',
            'stats.array' => 'Chỉ số phải là một mảng.',
            'stats.hp.required' => 'HP bắt buộc.',
            'stats.hp.integer' => 'HP phải là số nguyên.',
            'stats.hp.min' => 'HP tối thiểu là 0.',
            'stats.hp.max' => 'HP tối đa là 9999.',

            'stats.attack.required' => 'Tấn công bắt buộc.',
            'stats.attack.integer' => 'Tấn công phải là số nguyên.',
            'stats.attack.min' => 'Tấn công tối thiểu là 0.',
            'stats.attack.max' => 'Tấn công tối đa là 9999.',

            'stats.defend.required' => 'Phòng thủ bắt buộc.',
            'stats.defend.integer' => 'Phòng thủ phải là số nguyên.',
            'stats.defend.min' => 'Phòng thủ tối thiểu là 0.',
            'stats.defend.max' => 'Phòng thủ tối đa là 9999.',

            'stats.speed.required' => 'Tốc độ bắt buộc.',
            'stats.speed.numeric' => 'Tốc độ phải là số.',
            'stats.speed.min' => 'Tốc độ tối thiểu là 0.',
            'stats.speed.max' => 'Tốc độ tối đa là 999.',

            'stats.taunt.required' => 'Khiêu khích bắt buộc.',
            'stats.taunt.numeric' => 'Khiêu khích phải là số.',
            'stats.taunt.min' => 'Khiêu khích tối thiểu là 0.',
            'stats.taunt.max' => 'Khiêu khích tối đa là 999.',

            // souls
            'souls.required' => 'Tinh hồn bắt buộc.',
            'souls.array' => 'Tinh hồn phải là mảng.',
            'souls.max' => 'Tối đa 6 tinh hồn.',

            'souls.*.name.required' => 'Tên tinh hồn bắt buộc.',
            'souls.*.name.string' => 'Tên tinh hồn phải là chuỗi.',
            'souls.*.name.max' => 'Tên tinh hồn tối đa 255 ký tự.',

            'souls.*.desc.required' => 'Mô tả tinh hồn bắt buộc.',
            'souls.*.desc.string' => 'Mô tả tinh hồn phải là chuỗi.',

            'souls.*.image.required' => 'Ảnh tinh hồn bắt buộc.',
            'souls.*.image.image' => 'Ảnh tinh hồn phải là file ảnh hợp lệ.',
            'souls.*.image.mimes' => 'Ảnh tinh hồn chỉ chấp nhận định dạng jpeg, png, jpg, gif, webp.',
            'souls.*.image.max' => 'Ảnh tinh hồn không được vượt quá 10MB.',

            // skills
            'skills.required' => 'Kỹ năng bắt buộc.',
            'skills.array' => 'Kỹ năng phải là mảng.',

            'skills.*.name.required' => 'Tên kỹ năng bắt buộc.',
            'skills.*.name.string' => 'Tên kỹ năng phải là chuỗi.',
            'skills.*.name.max' => 'Tên kỹ năng tối đa 255 ký tự.',

            'skills.*.image.image' => 'Ảnh kỹ năng phải là file ảnh hợp lệ.',
            'skills.*.image.mimes' => 'Ảnh kỹ năng chỉ chấp nhận định dạng jpeg, png, jpg, gif, webp.',
            'skills.*.image.max' => 'Ảnh kỹ năng không được vượt quá 10MB.',

            'skills.*.gif.file' => 'File gif kỹ năng phải là file hợp lệ.',
            'skills.*.gif.mimes' => 'File gif kỹ năng chỉ chấp nhận định dạng gif.',
            'skills.*.gif.max' => 'File gif kỹ năng không được vượt quá 10MB.',

            // Ngoài ra nếu có rule string cho ảnh/gif (chẳng hạn URL)
            'skills.*.image.string' => 'Ảnh kỹ năng phải là chuỗi hoặc file ảnh hợp lệ.',
            'skills.*.gif.string' => 'File gif kỹ năng phải là chuỗi hoặc file gif hợp lệ.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return back()->json(['errors' => $validator->errors()], 422);
        }

        $character = Character::findOrFail($id);
        $validated = $validator->validated();

        $characterName = (string) $validated['name'];
        $skillFiles = $request->file('skills', []);
        $soulsFiles = $request->file('souls', []);
        $skillsToStore = [];
        $soulsToStore = [];

        if ($skillFiles != []) {
            // Xử lý Skills
            foreach ($validated['skills'] ?? [] as $type => $skill) {
                $skillsSave = [
                    'name' => $skill['name'] ?? null,
                    'desc' => $skill['desc'] ?? null,
                ];

                if (isset($skillFiles[$type]['image'])) {
                    $oldImage = $character->skills[$type]['image'] ?? null;
                    if ($oldImage) {
                        $cloudinary->uploadApi()->destroy($oldImage);
                    }

                    $uploadImg = $cloudinary->uploadApi()->upload(
                        $skillFiles[$type]['image']->getRealPath(),
                        ['folder' => "Characters/{$characterName}"]
                    );
                    $skillsSave['image'] = $uploadImg['public_id'];
                } else {
                    $skillsSave['image'] = $skill['image'] ?? ($character->skills[$type]['image'] ?? null);
                }

                if (isset($skillFiles[$type]['gif'])) {
                    $oldGif = $character->skills[$type]['gif'] ?? null;
                    if ($oldGif) {
                        $cloudinary->uploadApi()->destroy($oldGif);
                    }

                    $uploadGif = $cloudinary->uploadApi()->upload(
                        $skillFiles[$type]['gif']->getRealPath(),
                        ['folder' => "Characters/{$characterName}"]
                    );
                    $skillsSave['gif'] = $uploadGif['public_id'];
                } else {
                    $skillsSave['gif'] = $skill['gif'] ?? ($character->skills[$type]['gif'] ?? null);
                }

                $skillsToStore[$type] = $skillsSave;
            }
        }
        if ($soulsFiles != []) {
            foreach ($validated['souls'] ?? [] as $type => $soul) {
                $soulSave = [
                    'name' => $soul['name'] ?? null,
                    'desc' => $soul['desc'] ?? null,
                ];

                if (isset($soulsFiles[$type]['image'])) {
                    $oldImage = $character->souls[$type]['image'] ?? null;
                    if ($oldImage) {
                        $cloudinary->uploadApi()->destroy($oldImage);
                    }

                    $uploadImg = $cloudinary->uploadApi()->upload(
                        $soulsFiles[$type]['image']->getRealPath(),
                        ['folder' => "Characters/{$characterName}"]
                    );
                    $soulSave['image'] = $uploadImg['public_id'];
                } else {
                    $soulSave['image'] = $soul['image'] ?? ($character->souls[$type]['image'] ?? null);
                }

                $soulsToStore[$type] = $soulSave;
            }
        }

        // Xử lý ảnh nền
        $backgroundImage = $character->background;
        if ($request->hasFile('background')) {
            if ($backgroundImage) {
                $cloudinary->uploadApi()->destroy($backgroundImage);
            }

            $uploadBg = $cloudinary->uploadApi()->upload(
                $request->file('background')->getRealPath(),
                ['folder' => "Characters/{$characterName}"]
            );
            $backgroundImage = $uploadBg['public_id'];
        }

        // Xử lý ảnh đại diện
        $filenameImg = $character->image;
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($filenameImg) {
                $cloudinary->uploadApi()->destroy($filenameImg);
            }

            $uploadImg = $cloudinary->uploadApi()->upload(
                $request->file('image')->getRealPath(),
                ['folder' => "Characters/{$characterName}"]
            );
            $filenameImg = $uploadImg['public_id'];
        }

        // Cập nhật nhân vật
        $character->update([
            'name' => $characterName,
            'desc' => $validated['desc'] ?? null,
            'image' => $filenameImg,
            'background' => $backgroundImage,
            'faction' => $validated['faction'] ?? null,
            'gameplay' => $validated['gameplay'] ?? null,
            'rarity' => $validated['rarity'],
            'path_id' => $validated['path_id'],
            'element_id' => $validated['element_id'],
            'skills' => json_encode($skillsToStore, JSON_UNESCAPED_UNICODE),
            'stats' => $validated['stats'],
            'souls' => json_encode($soulsToStore, JSON_UNESCAPED_UNICODE),
        ]);

        // Cập nhật các mối quan hệ nhiều-nhiều
        $character->ornaments()->sync($request->input('ornaments', []));
        $character->relics()->sync($request->input('relics', []));
        $character->lightcores()->sync($request->input('lightcores', []));
        return response()->json(['message' => 'Cập nhật thành công.']);
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
        $character = Character::findOrFail($decodedID);

        // Xóa image chính
        if ($character->image) {
            try {
                $cloudinary->uploadApi()->destroy($character->image);
            } catch (\Exception $e) {
            }
        }

        // Xóa background
        if ($character->background) {
            try {
                $cloudinary->uploadApi()->destroy($character->background);
            } catch (\Exception $e) {
            }
        }

        // Xóa ảnh và gif trong skills
        $skills = json_decode($character->skills, true);
        if (is_array($skills)) {
            foreach ($skills as $skill) {
                if (!empty($skill['image'])) {
                    try {
                        $cloudinary->uploadApi()->destroy($skill['image']);
                    } catch (\Exception $e) {
                    }
                }
                if (!empty($skill['gif'])) {
                    try {
                        $cloudinary->uploadApi()->destroy($skill['gif']);
                    } catch (\Exception $e) {
                    }
                }
            }
        }

        // Xóa ảnh trong souls
        $souls = json_decode($character->souls, true);
        if (is_array($souls)) {
            foreach ($souls as $soul) {
                if (!empty($soul['image'])) {
                    try {
                        $cloudinary->uploadApi()->destroy($soul['image']);
                    } catch (\Exception $e) {
                    }
                }
            }
        }

        // 2. Xóa quan hệ nhiều-nhiều
        $character->ornaments()->detach();
        $character->relics()->detach();
        $character->lightcores()->detach();

        // 3. Xóa các bình luận liên quan (nếu có)
        $character->comments()->delete();

        // 4. Xóa bản ghi nhân vật
        $character->delete();

        return redirect()->route('characters.index')->with('success', 'Xóa nhân vật thành công!');
    }


    public function filter(Request $request)
    {
        $hashids = new \Hashids\Hashids('salt', 8);
        $pathReq = $request->input('Filters.p');
        $elementReq = $request->input('Filters.e');
        $rarityReq = $request->input('Filters.r');

        $decodedPathIds = [];
        $decodedElementIds = [];

        // Giải mã path_id
        if (!empty($pathReq)) {
            $pathIds = is_array($pathReq) ? $pathReq : [$pathReq];
            foreach ($pathIds as $encodedId) {
                $decoded = $hashids->decode($encodedId);
                if (!empty($decoded)) {
                    $decodedPathIds[] = $decoded[0];
                }
            }
        }
        // Giải mã element_id
        if (!empty($elementReq)) {
            $elementIds = is_array($elementReq) ? $elementReq : [$elementReq];
            foreach ($elementIds as $encodedId) {
                $decoded = $hashids->decode($encodedId);
                if (!empty($decoded)) {
                    $decodedElementIds[] = $decoded[0];
                }
            }
        }
        // Validate ID
        $validator = Validator::make([
            'path_ids' => $decodedPathIds,
            'element_ids' => $decodedElementIds,
        ], rules: [
            'path_ids.*' => 'exists:paths,id',
            'element_ids.*' => 'exists:elements,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Truy vấn dữ liệu
        $characters = Character::query()
            ->when(!empty($decodedPathIds), function ($query) use ($decodedPathIds) {
                $query->whereIn('path_id', $decodedPathIds);
            })
            ->when(!empty($decodedElementIds), function ($query) use ($decodedElementIds) {
                $query->whereIn('element_id', $decodedElementIds);
            })
            ->when(!empty($rarityReq), function ($query) use ($rarityReq) {
                $query->whereIn('rarity', $rarityReq);
            })
            ->get();

        return inertia('Characters', ['characters' => $characters, 'elements' => Element::all(), 'paths' => Path::all()]);
    }

    private function hashCollection($collection)
    {
        static $hashids = null;
        if (!$hashids) {
            $hashids = new \Hashids\Hashids('salt', 8);
        }

        return $collection->map(function ($item) use ($hashids) {
            $item->hashid = $hashids->encode($item->id);
            return $item;
        });
    }

    public function addComment(Request $request, $characterId)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $character = Character::findOrFail($characterId);

        $comment = $character->comments()->create([
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Bình luận đã được thêm!');
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'image' => ['required', 'string'],
            'background' => ['required', 'string'],
            'faction' => ['required', 'string'],
            'rarity' => ['required', 'integer', 'between:1,5'],
            'gameplay' => ['required', 'string'],
            'desc' => ['required', 'string'],
            'path_id' => ['required', 'integer', 'exists:paths,id'],
            'element_id' => ['required', 'integer', 'exists:elements,id'],

            'stats.hp' => ['required', 'string'],
            'stats.speed' => ['required', 'string'],
            'stats.attack' => ['required', 'string'],
            'stats.defend' => ['required', 'string'],
            'stats.taunt' => ['required', 'string'],

            'skills.basis.name' => ['required', 'string'],
            'skills.basis.desc' => ['required', 'string'],
            'skills.basis.image' => ['required', 'string'],
            'skills.basis.gif' => ['nullable', 'string'],

            'skills.skill.name' => ['required', 'string'],
            'skills.skill.desc' => ['required', 'string'],
            'skills.skill.image' => ['required', 'string'],
            'skills.skill.gif' => ['nullable', 'string'],

            'skills.ultimate.name' => ['required', 'string'],
            'skills.ultimate.desc' => ['required', 'string'],
            'skills.ultimate.image' => ['required', 'string'],
            'skills.ultimate.gif' => ['nullable', 'string'],

            'skills.talent.name' => ['required', 'string'],
            'skills.talent.desc' => ['required', 'string'],
            'skills.talent.image' => ['required', 'string'],
            'skills.talent.gif' => ['nullable', 'string'],

            'skills.technique.name' => ['required', 'string'],
            'skills.technique.desc' => ['required', 'string'],
            'skills.technique.image' => ['required', 'string'],
            'skills.technique.gif' => ['nullable', 'string'],

            'souls' => ['required', 'array', 'min:1'],
            'souls.*.name' => ['required', 'string'],
            'souls.*.desc' => ['required', 'string'],
            'souls.*.image' => ['required', 'string'],

            'relics' => ['required', 'array'],
            'relics.*' => ['integer', 'exists:relics,id'],

            'ornaments' => ['required', 'array'],
            'ornaments.*' => ['integer', 'exists:ornaments,id'],

            'lightcores' => ['required', 'array'],
            'lightcores.*' => ['integer', 'exists:lightcores,id'],
        ];
    }
}
