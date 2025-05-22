<?php

namespace Database\Seeders;

use App\Models\Character;
use Illuminate\Database\Seeder;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $char1 = Character::create([
            'name'=> 'Castorice',
            'desc'=> '<p>Aidonia - vương quốc tuyết phủ quanh năm tôn thờ cái chết, nay đã chìm vào giấc ngủ ngọt ngào.</p><p>Hỡi Castorice, người con gái của sông Styx, Hậu Duệ Chrysos tìm kiếm Ngọn Lửa "Tử Vong", hãy lên đường. Hãy che chở tiếng than khóc của những linh hồn trên thế gian này và ôm lấy nỗi cô đơn của vận mệnh,</p><p>— Sống chết đều là hành trình. Khi cánh bướm đậu trên nhành cây cũng là lúc sự tàn úa rồi sẽ tái sinh.</p>
            
            "Chào mừng đến Okhema, tôi là Castorice. Xin lỗi, giữ khoảng cách nhất định với người khác là thói quen của tôi... Nếu bạn muốn, đương nhiên tôi có thể đứng gần hơn một chút."',
            'rarity'=> 5,
            'faction'=> 'Amphoreus',
            'gameplay'=> 'Castorice là một DPS cực kỳ mạnh thuộc hệ Ký Ức, có khả năng tăng sát thương dựa trên HP và không tiêu tốn Điểm Kỹ Năng. Giống như Acheron và Feixiao, Castorice không sử dụng Năng Lượng cho Tuyệt Kỹ mà dựa vào hệ thống tích lũy dựa trên HP tiêu hao từ đồng đội.',
            
            'stats'=> json_encode([
                'hp'=> 1631,
                'attack'=> 523,
                'defend'=> 485,
                'speed'=> 87,
                'taunt'=> 100,
            ]),
            'skills'=> json_encode([
                'basis'=> ['name'=> 'Bi Ai, Gợn Sóng Từ Biển Chết', 'image'=> 'basis_x5zox3', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tấn Công Thường</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Đánh Đơn]</span></p><p><span style="color: rgba(255, 255, 255, 0.65)">Giảm Sức Bền</span> <span style="color: rgb(255, 200, 112)">10</span></p>', 'gif'=> 'basis_hzfmwi'],
                
                'skill'=> ['name'=> 'Im Lặng, Cái Chạm Khẽ Khàng Của Bướm Ma', 'image'=> 'skill_ytt0ka', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Chiến Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Khuếch Tán]</span></p><p><span style="color: rgba(255, 255, 255, 0.65)">Giảm Sức Bền</span> <span style="color: rgb(255, 200, 112)">20</span></p><p>Tiêu hao 30% HP hiện tại của toàn bộ phe ta, gây Sát Thương Lượng Tử bằng 25% Giới Hạn HP của Castorice lên 1 kẻ địch chỉ định, đồng thời gây Sát Thương Lượng Tử bằng 15% Giới Hạn HP của Castorice cho mục tiêu lân cận kẻ đó.Nếu HP hiện tại không đủ, tối đa khiến HP hiện tại giảm còn 1 điểm.Nếu có Rồng Tử Vong trong trận, Chiến Kỹ sẽ đổi thành "Móng Vuốt, Vòng Tay Của Rồng Tử Vong".</p>', 'gif'=> 'skill_oc25gj'],
                
                'ultimate'=> ['name'=>'Tiếng Thét Tử Vong, Hồi Chuông Tái Sinh', 'image'=> 'util_hhbovu', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tuyệt Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Triệu Hồi]</span></p><p>Triệu hồi Linh Hồn Ký Ức Rồng Tử Vong và khiến nó ưu tiên hành động 100%, đồng thời mở ra Vùng Lãnh Thổ Tử Địa Bị Lãng Quên, khiến Kháng Toàn Thuộc Tính của toàn bộ phe địch giảm 10%. Nếu Castorice có hiệu ứng tăng sát thương từ Thiên Phú, thì hiệu ứng này sẽ khuếch tán lên Rồng Tử Vong. Rồng Tử Vong ban đầu có 165 điểm Tốc Độ và Giới Hạn HP cố định bằng 100% giới hạn của Nhụy Hoa.Rồng Tử Vong sẽ tan biến sau 3 hiệp hoặc khi HP về 0, đồng thời giải trừ Vùng Lãnh Thổ Tử Địa Bị Lãng Quên.</p>', 'gif'=> 'util_jp18i7'],
                
                'talent'=> ['name'=>'Cõi Hoang Vu Trong Lòng Bàn Tay', 'image'=> 'talent_iuyqy1', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Thiên Phú</span></strong></p><p>Giới hạn Nhụy Hoa có liên quan đến cấp của toàn bộ nhân vật trong trận. Toàn phe ta mỗi khi mất đi 1 điểm HP, Castorice sẽ nhận được 1 điểm Nhụy Hoa, khi Nhụy Hoa đạt giới hạn có thể kích hoạt Tuyệt Kỹ. Khi phe ta mất HP, sát thương của Castorice và Rồng Tử Vong gây ra sẽ tăng 10%, hiệu ứng này tối đa cộng dồn 3 tầng, duy trì 3 hiệp.Khi Rồng Tử Vong trong trận sẽ không thể nhận Nhụy Hoa thông qua Thiên Phú. Ngoại trừ Rồng Tử Vong, toàn phe ta mỗi khi mất đi 1 điểm HP sẽ chuyển hóa thành HP bằng với Rồng Tử Vong.</p>', 'gif'=> 'talent_blgczt'],

                'technique'=> ['name'=>'Tiếng Thét Đau Thương, Điềm Báo Chết Chóc', 'image'=> 'tech_yvraus', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Bí Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Quấy Nhiễu]</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Sau khi dùng Bí Kỹ, sẽ vào trạng thái "U Ám" trong 20 giây. Kẻ địch ở trạng thái "U Ám" không thể chủ động áp sát Castorice.</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Ở trạng thái "U Ám", chủ động tấn công sẽ khiến tất cả kẻ địch trong phạm vi vào chiến đấu, đồng thời triệu hồi Linh Hồn Ký Ức Rồng Tử Vong và khiến nó ưu tiên hành động 100%, cũng như triển khai Vùng Lãnh Thổ "Tử Địa Bị Lãng Quên", Rồng Tử Vong có HP hiện tại bằng 50% giới hạn Nhụy Hoa. Sau khi vào chiến đấu, sẽ tiêu hao 40% HP hiện tại của toàn thể phe ta ngoại trừ Rồng Tử Vong.</span></p>', 'gif'=> 'tech_uu6rsk'],
                
            ]),
            'souls'=> json_encode([
                [
                    // tinh hồn 1
                    'image'=> 'e1_mekxvl',
                    'name'=>'Thánh Nữ Trong Tuyết, Nhập Liệm Ký Ức',
                    'desc'=> 'Khi HP hiện tại của mục tiêu phe địch nhỏ hơn hoặc bằng 80%/50% Giới Hạn HP của bản thân, sát thương "Móng Vuốt, Vòng Tay Của Rồng Tử Vong", "Móng Vuốt Xé Toạc U Minh", "Ngọn Lửa Thiêu Rụi Bóng Tối", "Đôi Cánh Càn Quét Phế Tích" gây ra cho kẻ đó sẽ bằng 120%/140% sát thương gốc.'
                ],
                [
                    // tinh hồn 2
                    'image'=> 'e2_us5taf',
                    'name'=>'Vương Miện Nở Rộ Nơi Cánh Bướm',
                    'desc'=> 'Sau khi triệu hồi Linh Hồn Ký Ức Rồng Tử Vong, Castorice nhận 2 tầng "Ý Chí Rực Lửa", Ý Chí Rực Lửa tối đa đạt 2 tầng, có thể dùng để khấu trừ HP tiêu hao của Kỹ Năng Linh Hồn Ký Ức Rồng Tử Vong "Ngọn Lửa Thiêu Rụi Bóng Tối", đồng thời khiến Castorice Ưu Tiên Hành Động 100%, lần sau thi triển Chiến Kỹ Cường Hóa, Castorice sẽ nhận Nhụy Hoa bằng 30% điểm giới hạn của Nhụy Hoa.'
                ],
                [
                    // tinh hồn 3
                    'image'=> 'e3_bbv9b6',
                    'name'=>'Lữ Khách Cung Kính Nhẹ Lướt Vào Cõi Chết',
                    'desc'=> 'Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10; Cấp Thiên Phú của Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
                ],
                [
                    // tinh hồn 4
                    'image'=> 'e4_zpnlzp',
                    'name'=>'An Giấc Trong Khúc Bi Ca Sâu Lắng',
                    'desc'=> 'Khi có Castorice trong trận, lượng hồi phục khi trị liệu cho toàn phe ta sẽ tăng 20%.'
                ],
                [
                    // tinh hồn 5
                    'image'=> 'e5_xakjsm',
                    'name'=>'Trang Giấy Nguyên Sơ, Điểm Xuyết Lời Tiên Tri',
                    'desc'=> 'Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; Cấp Thiên Phú +2, tối đa không vượt quá cấp 15; Cấp Kỹ Năng Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
                ],
                [
                    // tinh hồn 6
                    'image'=> 'e6_pvw2xo',
                    'name'=>'Chờ Đợi Tháng Năm Thoát Kén Tuôn Trào',
                    'desc'=> 'Khi Castorice và Rồng Tử Vong gây sát thương, tăng 20% Xuyên Kháng Lượng Tử. Trong thời gian Rồng Tử Vong tấn công có thể bỏ qua thuộc tính Điểm Yếu và làm giảm Sức Bền phe địch, khi phá vỡ điểm yếu, sẽ kích hoạt hiệu ứng Phá Vỡ Điểm Yếu Lượng Tử, số lần nảy bật khi Rồng Tử Vong kích hoạt Thiên Phú Đôi Cánh Càn Quét Phế Tích tăng thêm 3 lần.'
                ]
            ]),
            'image' => 'cardImg_wzlzui',
            'background'=> 'Castorice_nbzo6n',
            'element_id' => 7,
            'path_id'=> 8,
        ]);

        $char2 =Character::create([
            'name'=> 'Mydei',
            'desc'=> '<p>Kremnos, thành bang chìm trong sương mù, thành bang của hỗn loạn và chiến tranh! Hoàng tộc của nó mang dòng máu sát hại thân thích, thần linh của nó mang tên gọi Tai Ương.</p><p>Mydeimos bất tử, con sư tử xa bầy, Hậu Duệ Chrysos săn lùng Ngọn Lửa "Phân Tranh". Chịu đựng cái chết hàng vạn lần, tắm máu để trở về quê hương, một mình gánh vác số mệnh điên rồ – Giết vua để trở thành vua, diệt thần để trở thành thần. Vó sắt của chiến tranh đạp qua hoang mạc, cuối cùng cũng phải nhuốm máu quê hương.</p>',
            'rarity'=> 5,
            'faction'=> 'Amphoreus',
            'gameplay'=> 'Bộ kỹ năng của Mydei cho phép anh ta theo dõi lượng HP đã mất và khi thu thập đủ điểm, anh sẽ vào trạng thái Huyết Thù, trạng thái này sẽ tăng HP tối đa của anh – và do đó là lượng sát thương đầu ra – và cho phép anh sử dụng Kỹ năng Cường Hóa. Bù lại, Phòng Thủ của Mydei được đặt thành 0, nhưng nếu anh ta nhận một đòn chí mạng trong Huyết Thù, anh ta sẽ phục hồi 50% HP và quay trở lại chiến đấu.',
            'stats'=> json_encode([
                'hp'=> 1552,
                'attack'=> 427,
                'defend'=> 194,
                'speed'=> 95,
                'taunt'=> 125,
            ]),
            'skills'=> json_encode([
                'basis'=> ['name'=> 'Lời Thề Dẫm Nát Hành Trình', 'image'=> 'basis_m5qbod', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tấn Công Thường</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Đánh Đơn]</span></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">10</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng </span><span style="color: rgb(255, 200, 112)">25%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định.</span></p>', 
                'gif'=> 'basis_hfbxa7'],
                
                'skill'=> ['name'=> 'Vạn Lần Chết Không Hối Hận', 'image'=> 'skill_yn9zf1', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Chiến Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Khuếch Tán]</span></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">20</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Hồi HP bằng </span><span style="color: rgb(255, 200, 112)">15,0%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei và tích lũy 20 điểm Nạp Năng Lượng Thiên Phú. Gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng </span><span style="color: rgb(255, 200, 112)">96%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định, đồng thời gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng </span><span style="color: rgb(255, 200, 112)">60%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei cho mục tiêu lân cận, khiến mục tiêu và mục tiêu lân cận rơi vào trạng thái Khiêu Khích, duy trì 2 hiệp. Sát Thần Đăng Thần lần kế tiếp sẽ ưu tiên tấn công 1 kẻ địch chỉ định, hiệu ứng này chỉ có hiệu lực với mục tiêu mới nhất.</span></p>', 'gif'=> 'skill_iyispz'],

                'ultimate'=> ['name'=>'Ngai Vàng Xương Cốt', 'image'=> 'util_bxtjri', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tuyệt Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Khuếch Tán]</span></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">20</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Hồi HP bằng </span><span style="color: rgb(255, 200, 112)">15,0%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei và tích lũy 20 điểm Nạp Năng Lượng Thiên Phú. Gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng </span><span style="color: rgb(255, 200, 112)">96%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định, đồng thời gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng </span><span style="color: rgb(255, 200, 112)">60%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei cho mục tiêu lân cận, khiến mục tiêu và mục tiêu lân cận rơi vào trạng thái Khiêu Khích, duy trì 2 hiệp. Sát Thần Đăng Thần lần kế tiếp sẽ ưu tiên tấn công 1 kẻ địch chỉ định, hiệu ứng này chỉ có hiệu lực với mục tiêu mới nhất.</span></p>','gif'=> 'util_aiqfbd'], 
                
                'technique'=> ['name'=>'Lồng Giam Giáo Gãy Thần Phục', 'image'=> 'tech_joupih', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Bí Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Quấy Nhiễu]</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Sau khi dùng Bí Kỹ sẽ lôi kéo kẻ địch trong khu vực nhất định và khiến chúng rơi vào trạng thái Choáng 10 giây. Kẻ địch trong trạng thái Choáng sẽ không thể chủ động tấn công mục tiêu phe ta.<br>Nếu chủ động tấn công kẻ địch rơi vào trạng thái Choáng, thì khi vào chiến đấu sẽ gây </span><span style="color: rgb(255, 235, 97)">Sát Thương Số Ảo</span><span style="color: rgba(255, 255, 255, 0.85)"> bằng 80% Giới Hạn HP của Mydei cho toàn bộ phe địch, đồng thời khiến mục tiêu rơi vào trạng thái Khiêu Khích, duy trì 1 hiệp. Bản thân tích lũy 50 điểm Nạp Năng Lượng của Thiên Phú.</span></p>', 'gif'=> 'tech_boj4bk'],

                'talent'=> ['name'=>'Nợ Máu Trả Bằng Máu', 'image'=> 'talent_qhppmo', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Thiên Phú</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Cường Hóa]</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Mỗi 1% HP bị mất đi sẽ tích lũy 1 điểm Nạp Năng Lượng, tối đa tích lũy 200 điểm. Khi Nạp Năng Lượng đạt 100 điểm thì sẽ tiêu hao 100 điểm này để vào trạng thái "Huyết Thù" và hồi HP bằng </span><span style="color: rgb(255, 200, 112)">15%</span><span style="color: rgba(255, 255, 255, 0.85)"> Giới Hạn HP của Mydei, đồng thời Ưu Tiên Hành Động 100%. Trong trạng thái "Huyết Thù", Giới Hạn HP sẽ tăng, giá trị tăng bằng 50% Giới Hạn HP hiện tại, Phòng Thủ duy trì bằng 0. Khi hiệp của bản thân bắt đầu sẽ tự động thi triển "Sát Vương Thành Vương".<br>Trong trạng thái "Huyết Thù" khi Nạp Năng Lượng đạt 150 điểm, Mydei sẽ lập tức nhận được 1 hiệp thêm và tự động thi triển "Sát Thần Đăng Thần".<br>Trong trạng thái "Huyết Thù", khi Mydei chịu tấn công chí tử sẽ không rơi vào trạng thái không thể chiến đấu, nhưng sẽ xóa Nạp Năng Lượng và thoát khỏi trạng thái Huyết Thù, đồng thời hồi HP bằng 50% Giới Hạn HP của bản thân.</span></p>', 'gif'=> 'talent_blgczt'],

            ]),
            'souls'=> json_encode([
                [
                    // tinh hồn 1
                    'image'=> 'e1_bvetjr',
                    'name'=>'Gió Lạnh Khắc Nên Xương Sống Bất Khuất',
                    'desc'=> 'Tăng 30% Bội Số Sát Thương mà Sát Thần Đăng Thần gây ra cho mục tiêu chính, đồng thời biến thành Sát Thương Số Ảo gây ra cho toàn bộ phe địch bằng với Bội Số Sát Thương của mục tiêu chính.'
                ],
                [
                    // tinh hồn 2
                    'image'=> 'e2_jr1225',
                    'name'=>'Phân Tranh Chứng Kiến Tiếng Gào Của Thi Thể',
                    'desc'=> 'Trong trạng thái "Huyết Thù", sát thương Mydei gây ra sẽ bỏ qua 15% Phòng Thủ của mục tiêu phe địch, đồng thời sau khi nhận trị liệu, sẽ khiến 40% giá trị trị liệu chuyển hóa thành Nạp Năng Lượng, Nạp Năng Lượng được tích lũy chuyển hóa này không vượt quá 40 điểm. Sau khi bất kỳ đơn vị nào hành động, sẽ tái lập Nạp Năng Lượng có thể tích lũy.'
                ],
                [
                    // tinh hồn 3
                    'image'=> 'e3_qrs3jq',
                    'name'=>'Vinh Quang Soi Chiếu Bữa Tiệc Không Tàn',
                    'desc'=> 'Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10; Cấp Thiên Phú của Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
                ],
                [
                    // tinh hồn 4
                    'image'=> 'e4_ezyru9',
                    'name'=>'Kèn Lệnh Đánh Thức Con Sư Tử Trầm Mặc',
                    'desc'=> 'Trong thời gian trạng thái "Huyết Thù", sát thương Bạo Kích tăng 30%, sau khi bị mục tiêu phe địch tấn công, sẽ hồi HP bằng 10% Giới Hạn HP của bản thân.'
                ],
                [
                    // tinh hồn 5
                    'image'=> 'e5_wqmyfl',
                    'name'=>'Binh Đao Chạm Trổ Ngọn Lửa Của Thân Xác',
                    'desc'=> 'Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
                ],
                [
                    // tinh hồn 6
                    'image'=> 'e6_h8gnja',
                    'name'=>'Quá Khứ Đạp Lên Ngọn Núi Máu',
                    'desc'=> 'Khi vào chiến đấu lập tức vào trạng thái "Huyết Thù", đồng thời điểm Nạp Năng Lượng cần cho "Sát Thần Đăng Thần" sẽ giảm còn 100.'
                ]
            ]),
            'image' => 'cardImg_jeeajd',
            'background'=> 'bg_m2hxtu',
            'element_id' => 6,
            'path_id'=> 1,
        ]);

        $char3 =Character::create([
            'name'=> 'Pela',
            'desc'=> '<p>Sĩ quan tình báo Thiết Vệ Bờm Bạc. Chăm chỉ, được các thành viên của đội thiết vệ vô cùng kính trọng.</p>',
            'rarity'=> 4,
            'faction'=> 'Thiết Vệ Bờm Bạc Belobog',
            'gameplay'=> 'Pela là một nhân vật hỗ trợ 4 sao vận mệnh Hư Vô hệ Băng thân thiện với mọi nhà, vừa có thể giảm Phòng Thủ vừa có khả năng xóa hiệu ứng buff của kẻ địch. Tinh hồn [Phân Tích Đầy Đủ] của Pela còn có thể gây giảm kháng Sát Thương Băng, phù hợp với những đội hình có sát thương chủ lực hệ Băng.
Pela có chỉ số tỷ lệ gây Hiệu Ứng Xấu cơ bản cao sẵn, nên không cần phải quá tập trung vào chỉ số Chính Xác Hiệu Ứng. Thay vào đó, việc tập trung vào Tốc Độ và Tấn Công Kích Phá, hoặc các chỉ số sinh tồn để giúp Pela có thể đứng vững trên sàn đấu là điều cần thiết. Ngoài ra, nâng cao chỉ số Hồi Năng Lượng cũng là một lối đi tốt khi có thể tận dụng triệt để khả năng hồi năng lượng mỗi khi cô tấn công kẻ địch đang chịu Hiệu Ứng Xấu, qua đó gia tăng số lần sử dụng Tuyệt Kỹ và tối ưu khả năng gây debuff của cô nàng.',
            'stats'=> json_encode([
                'hp'=> 987,
                'attack'=> 546,
                'defend'=> 463,
                'speed'=> 105,
                'taunt'=> 100,
            ]),
            'skills'=> json_encode([
                'technique'=> ['name'=> 'Giáng Đòn Phủ Đầu', 'image'=> 'tech_yijtw6', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Bí Kỹ</span></strong></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">20</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Tấn công kẻ địch ngay lập tức, sau khi vào chiến đấu, sẽ gây cho 1 kẻ địch ngẫu nhiên</span><span style="color: rgb(71, 199, 253)"> Sát Thương Băng</span><span style="color: rgba(255, 255, 255, 0.85)"> tương đương 80% Tấn Công của Pela, đồng thời có 100% xác suất cơ bản khiến Phòng Thủ của mỗi kẻ địch giảm 20%, duy trì 2 hiệp.</span></p>', 'gif'=> 'technique_nydnkw'],

                'basis'=> ['name'=> 'Xạ Kích Đóng Băng', 'image'=> 'basis_nrrpm1', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tấn Công Thường</span></strong></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">10</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Gây </span><span style="color: rgb(71, 199, 253)">Sát Thương Băng</span><span style="color: rgba(255, 255, 255, 0.85)"> cho 1 kẻ địch chỉ định tương đương </span><span style="color: rgb(255, 200, 112)">50%</span><span style="color: rgba(255, 255, 255, 0.85)"> Tấn Công của Pela.</span></p>', 'gif'=> 'basic_wievnf'],
                
                'ultimate'=> ['name'=>'Áp Chế Không Gian', 'image'=> 'util_j06waj', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Tuyệt Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Đánh Lan]</span></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">20</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Có 100% xác suất cơ bản khiến mỗi kẻ địch rơi vào trạng thái Thông Hiểu, đồng thời gây </span><span style="color: rgb(71, 199, 253)">Sát Thương Băng</span><span style="color: rgba(255, 255, 255, 0.85)"> cho toàn bộ kẻ địch tương đương </span><span style="color: rgb(255, 200, 112)">60%</span><span style="color: rgba(255, 255, 255, 0.85)"> Tấn Công của Pela.</span></p>', 'gif'=> 'ulti_gxvvqq'],
                
                'skill'=> ['name'=>'Tê Cóng', 'image'=> 'skill_ggyucw', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Chiến Kỹ</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Đánh Đơn]</span></p><p>Giảm Sức Bền <span style="color: rgb(219, 194, 145)">20</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Giải trừ 1 hiệu ứng buff của 1 kẻ địch chỉ định, đồng thời gây</span><span style="color: rgb(71, 199, 253)"> Sát Thương Băng</span><span style="color: rgba(255, 255, 255, 0.85)"> tương đương </span><span style="color: rgb(255, 200, 112)">105%</span><span style="color: rgba(255, 255, 255, 0.85)"> Tấn Công của Pela.</span></p>', 'gif'=> 'skill_zywgpt'],
                
                'talent'=> ['name'=>'Thu Thập Dữ Liệu', 'image'=> 'talent_sl4hpw', 'desc'=> '<p><strong><span style="color: rgba(255, 255, 255, 0.85)">Thiên Phú</span></strong></p><p><span style="color: rgb(255, 200, 112)">[Hỗ Trợ]</span></p><p><span style="color: rgba(255, 255, 255, 0.85)">Sau khi thi triển tấn công, nếu kẻ địch rơi vào Hiệu Ứng Xấu, thì Pela sẽ hồi thêm </span><span style="color: rgb(255, 200, 112)">5</span><span style="color: rgba(255, 255, 255, 0.85)"> Năng Lượng. Hiệu ứng này mỗi lần tấn công chỉ có thể kích hoạt 1 lần.</span></p>', 'gif'=> 'null'],
            ]),
            'souls'=> json_encode([
                [
                    // tinh hồn 1
                    'image'=> 'e1_tpjkxl',
                    'name'=>'Báo Cáo Chiến Thắng',
                    'desc'=> 'Khi mục tiêu phe địch bị tiêu diệt, Pela sẽ hồi 5 điểm Năng Lượng.'
                ],
                [
                    // tinh hồn 2
                    'image'=> 'e2_ifwyeg',
                    'name'=>'Không Ngừng Đột Kích',
                    'desc'=> 'Khi thi triển Chiến Kỹ giải trừ hiệu ứng buff, Tốc Độ tăng 10%, duy trì 2 hiệp.'
                ],
                [
                    // tinh hồn 3
                    'image'=> 'e3_rx9tnd',
                    'name'=>'Tăng Cấp Áp Chế',
                    'desc'=> 'Cấp Chiến Kỹ +2, tối đa không quá 15 cấp; Cấp Tấn Công Thường +1, tối đa không quá 10 cấp.'
                ],
                [
                    // tinh hồn 4
                    'image'=> 'e4_aikbho',
                    'name'=>'Phân Tích Đầy Đủ',
                    'desc'=> 'Khi thi triển Chiến Kỹ, có 100% xác suất cơ bản khiến Kháng Băng của mục tiêu địch giảm 12%, duy trì 2 hiệp.'
                ],
                [
                    // tinh hồn 5
                    'image'=> 'e5_mgwgmz',
                    'name'=>'Quấy Nhiễu Tuyệt Đối',
                    'desc'=> 'Cấp Tuyệt Kỹ +2, tối đa không quá 15 cấp; Cấp Thiên Phú +2, tối đa không quá 15 cấp.'
                ],
                [
                    // tinh hồn 6
                    'image'=> 'e6_zwzqqn',
                    'name'=>'Truy Kích Yếu Ớt',
                    'desc'=> 'Sau khi thi triển tấn công, nếu kẻ địch đang trong Hiệu Ứng Xấu, sẽ gây Sát Thương Băng kèm theo cho kẻ đó bằng 40% Tấn Công của Pela.'
                ]
            ]),
            'image' => 'cardImg_u1bpg9',
            'background'=> 'Pela_qlowir',
            'element_id' => 2,
            'path_id'=> 5,
        ]);

        $char1->lightcores()->syncWithoutDetaching([3]);
        $char1->relics()->syncWithoutDetaching([1]);
        $char1->ornaments()->syncWithoutDetaching([1]);


    }
}
