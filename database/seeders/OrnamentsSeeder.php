<?php

namespace Database\Seeders;

use App\Models\Ornaments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrnamentsSeeder extends Seeder
{

    public function run(): void
    {
        Ornaments::create([
                'name' => 'Vùng Đất Nhặt Hài Cốt Tĩnh Lặng',
                'image' => 'Vùng_Đất_Nhặt_Hài_Cốt_Tĩnh_Lặng_olhjjy',
                'set_two' => 'Tăng 12% Giới Hạn HP của người trang bị. Khi Giới Hạn HP của người trang bị lớn hơn hoặc bằng 5.000, sẽ tăng 28% Sát Thương Bạo Kích của người trang bị và Linh Hồn Ký Ức của người đó.',
                'suit'=>json_encode([
                    'PS'=> 'PS_tb7gdk',
                    'LR'=> 'LR_u0mswp'
                ]),
                'type'=> json_encode([
                   'Sát thương bạo kích',
                   'HP'
                ])
        ]);
        Ornaments::create([
                'name' => 'Biển Lục Địa Chìm - Lushaka',
                'image' => 'Biển_Lục_Địa_Chìm_-_Lushaka_hzlcee',
                'set_two' => 'Khiến Hiệu Suất Hồi Năng Lượng của người trang bị tăng 5%, nếu người trang bị không phải nhân vật vị trí đầu tiên trong đội, thì sẽ khiến Tấn Công của nhân vật ở vị trí đầu tiên trong đội tăng 12%.',
                'suit'=>json_encode([
                    'PS'=> 'PS_xwjqwx',
                    'LR'=> 'LRwebp_q0djhy'
                ]),
                'type'=> json_encode([
                   'Sát thương phe ta tăng',
                   'Hiệu suất hồi năng lượng'
                ])
        ]);
        Ornaments::create([
            'name' => 'Công Viên Chuối Kỳ Ảo',
            'image' => 'Công_Viên_Chuối_Kỳ_Ảo_xqbl0n',
            'set_two' => 'Khiến Sát Thương Bạo Kích của người trang bị tăng 16%, khi tồn tại mục tiêu mà người trang bị triệu hồi, Sát Thương Bạo Kích sẽ tăng thêm 32%.',
            'suit'=>json_encode([
                'PS'=> 'PS_xnpq2d',
                'LR'=> 'LR_fjfwn9'
            ]),
            'type'=> json_encode([
               'Tấn công',
               'Sát thương bạo kích',
            ])
        ]);
        Ornaments::create([
            'name' => 'Izumo Hiện Thế Và Thần Quốc Cõi Trời',
            'image' => 'Izumo_Hiện_Thế_Và_Thần_Quốc_Cõi_Trời_xneoi9',
            'set_two' => 'Tăng 12% Tấn Công của người trang bị. Khi vào chiến đấu, nếu có ít nhất 1 đồng đội cùng Vận Mệnh với người trang bị, thì Tỷ Lệ Bạo Kích của người trang bị tăng 12%',
            'suit'=>json_encode([
                'PS'=> 'PS_oosloy',
                'LR'=> 'qutvcdvihdikvfxbb09s'
            ]),
            'type'=> json_encode([
               'Tấn công',
               'Tỉ lệ bạo kích',
            ])
        ]);
        Ornaments::create([
            'name' => 'Vonwacq Hoạt Bát',
            'image' => 'Vonwacq_Hoạt_Bát_mtsghj',
            'set_two' => 'Tăng 5% hiệu suất hồi Năng Lượng của người trang bị. Khi tốc độ của người trang bị từ 120 trở lên, vào chiến đấu sẽ lập tức Ưu Tiên Hành Động 40%.',
            'suit'=>json_encode([
                'PS'=> 'PS_k4hu4s',
                'LR'=> 'LR_nw9zjg'
            ]),
            'type'=> json_encode([
               'Hiệu xuất hồi năng lượng',
               'Tốc độ',
               'Ưu tiên hành động',
            ])
        ]);
    }
}
