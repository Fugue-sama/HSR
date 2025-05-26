<?php

namespace Database\Seeders;

use App\Models\Relics;
use Illuminate\Database\Seeder;

class RelicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Relics::create([
                'name' => 'Nhà Thơ Khúc Bi Ca Vong Quốc',
                'image' => 'Nhà_Thơ_Khúc_Bi_Ca_Vong_Quốc_o0bzoh',
                'set_two'=> 'Sát Thương Lượng Tử tăng 10%',
                'set_four'=> 'Khiến Tốc Độ của người trang bị giảm 8%. Trước khi vào chiến đấu, nếu Tốc Độ của trang bị dưới 110/95, sẽ khiến Tỷ Lệ Bạo Kích của người trang bị tăng 20%/32%. Hiệu ứng này đồng thời có hiệu lực với Linh Hồn Ký Ức của người trang bị.',
                'suit'=>json_encode([
                    'Head'=> 'head_libjde',
                    'Hands'=> 'hands_s0nc9s',
                    'Body'=> 'body_e7byqb',
                    'Feet'=> 'feets_loke9l'
                ]),
                'type'=> json_encode([
                   'Sát Thương Bạo Kích',
                   'HP'
                ])
        ]);
        Relics::create([
                'name' => 'Anh Hùng Ca Khúc Khải Hoàn',
                'image' => 'Anh_Hùng_Ca_Khúc_Khải_Hoàn_fkf3uv',
                'set_two'=> 'Tấn Công tăng 12%',
                'set_four'=> 'Khi Linh Hồn Ký Ức của người trang bị trong trận, Tốc Độ của người trang bị tăng 6%, Khi Linh Hồn Ký Ức của người trang bị tấn công, Sát Thương Bạo Kích của Linh Hồn Ký Ức và người trang bị tăng 30%, duy trì 2 hiệp.',
                'suit'=>json_encode([
                    'Head'=> 'head_mx8mnl',
                    'Hands'=> 'hands_v1lcpn',
                    'Body'=> 'body_b3hgvo',
                    'Feet'=> 'feets_yjvqwg'
                ]),
                'type'=> json_encode([
                   'Sát thương bạo kích',
                   'Tấn công',
                   'Tốc độ',
                ])
        ]);
        Relics::create([
            'name' => 'Lại Một Hành Trình Gian Khổ Của Linh Mục',
            'image' => 'Lại_Một_Hành_Trình_Gian_Khổ_Của_Linh_Mục_m3lnn0',
            'set_two'=> 'Tốc Độ tăng 6%.',
            'set_four'=> 'Khi thi triển Chiến Kỹ hoặc Tuyệt Kỹ lên 1 mục tiêu phe ta, sẽ khiến Sát Thương Bạo Kích của mục tiêu kỹ năng tăng 18%, duy trì 2 hiệp, hiệu ứng này tối đa cộng dồn 2 lần.',
            'suit'=>json_encode([
                'Head'=> 'head_n9n2jp',
                'Hands'=> 'hands_ysgm95',
                'Body'=> 'body_alad6x',
                'Feet'=> 'feet_f9dlim'
            ]),
            'type'=> json_encode([
                'Tốc độ',
                'Tấn công thường',
               'Chiến kỹ',
               'Sát thương bạo kích',
               'Tuyệt kỹ',
            ])
        
        ]);
        Relics::create([
            'name' => 'Thiết Kỵ Diệt Trừ Tai Họa',
            'image' => 'Thiết_Kỵ_Diệt_Trừ_Tai_Họa_uqcr0a',
            'set_two'=> 'Tấn Công Kích Phá tăng 16%.',
            'set_four'=> 'Khi Tấn Công Kích Phá của người trang bị lớn hơn hoặc bằng 150%, Sát Thương Phá Vỡ gây ra cho kẻ địch sẽ bỏ qua 10% Phòng Thủ của kẻ đó. Khi Tấn Công Kích Phá của người trang bị lớn hơn hoặc bằng 250%, Siêu Sát Thương Phá Vỡ gây ra cho kẻ địch sẽ bỏ qua thêm 15% Phòng Thủ của kẻ đó.',
            'suit'=>json_encode([
                'Head'=> 'head_yhvjqa',
                'Hands'=> 'hands_unxlo1',
                'Body'=> 'body_feyuuz',
                'Feet'=> 'feets_ruo4az'
            ]),
            'type'=>json_encode([
               'Tấn công kích phá',
               'Bỏ qua phòng thủ',
            ])
          
        ]);
        Relics::create([
            'name' => 'Tín Sứ Du Ngoạn Không Gian Hacker',
            'image' => 'Tín_Sứ_Du_Ngoạn_Không_Gian_Hacker_zfuxsx',
            'set_two'=> 'Tăng Tốc Độ 6%.',
            'set_four'=> 'Khi người trang bị thi triển Tuyệt Kỹ lên mục tiêu phe ta, tốc độ toàn phe ta tăng 12%, duy trì 1 hiệp, hiệu ứng này không thể cộng dồn.',
            'suit'=>json_encode([
                'Head'=> 'head_gprtml',
                'Hands'=> 'hand_y9bd7r',
                'Body'=> 'boy_krf1p2',
                'Feet'=> 'feets_uygv8l'
            ]),
            'type'=>json_encode([
               'Tốc độ',
            ])
        ]);
        Relics::create([
            'name' => 'Tiên Phong Trong Nước Chết',
            'image' => 'Tiên_Phong_Trong_Nước_Chết_mvwce1',
            'set_two'=> 'Sát thương gây ra cho kẻ địch bị ảnh hưởng bởi Hiệu Ứng Xấu tăng',
            'set_four'=> 'Khi người trang bị thi triển Tuyệt Kỹ lên mục tiêu phe ta, tốc độ toàn phe ta tăng 12%, duy trì 1 hiệp, hiệu ứng này không thể cộng dồn.',
            'suit'=>json_encode([
                'Head'=> 'p1ppxhna1mjuddagaafk',
                'Hands'=> 'hands_kao956',
                'Body'=> 'body_kxdg9p',
                'Feet'=> 'feets_nuyh1k'
            ]),
            'type'=>json_encode([
               'Sát thương bạo kích',
               'Tỉ lệ bạo kích',
            ])
        ]);
    }
}
