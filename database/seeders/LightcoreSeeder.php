<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LightcoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('lightcores')->insert([
            'name'=> 'Múa! Múa! Múa!',
            'subtile'=> 'Không, Không Dừng Lại Được',
            'effect' => 'Sau khi người trang bị thi triển Tuyệt Kỹ, toàn phe ta sẽ ưu tiên hành động 16/18/20/22/24%.',
            'path_id'=> 4,
            'rarity'=> 4,
            'image'=> 'dancedance_lt53ua',
            'desc'=> '"Vì sao Hook không thể nhảy múa quay vòng giống như Clara nhỉ..." Cô ấy nắm chặt tay, miệng lầu bầu, đôi má tròn trịa ửng hồng trong chiếc nón lông. "Ngài Svarog có thể giúp Hook không?" Robot nghiêm trang không nói một lời nào chìa cánh tay máy móc của mình ra."Quay muốn xỉu rồi! Đáng ghét... thả ta xuống mau!"',
            'hp'=> '43',
            'attack'=> '19',
            'defend' => '19',
            'roll'=>'both',
        ]);
        DB::table('lightcores')->insert([
            'name'=> 'Đường Dài Vẫn Có Lối Về',
            'subtile'=> 'Tái Sinh',
            'effect' => 'Khiến Tấn Công Kích Phá của người trang bị tăng 60%/70%/80%/90%/100%. Khi điểm yếu của mục tiêu phe địch bị phá vỡ sẽ có 100% xác suất cơ bản khiến kẻ đó rơi vào trạng thái Lửa Đốt, Sát Thương Phá Vỡ phải chịu tăng 18%/21%/24%/27%/30%, duy trì 2 hiệp, hiệu ứng này có thể cộng dồn 2 tầng.',
            'rarity'=> 5,
            'path_id'=> 5,
            'image'=> 'Đường_Dài_Vẫn_Có_Lối_Về_wo8rkh',
            'desc'=> '"Cô ấy... là ai?" Người thiếu nữ vuốt ve bản thân xa lạ.
Cô ấy nhớ lại ngọn lửa của ngày hôm ấy đã nuốt chửng cô như thế nào, chiếc quạt khảm ngọc đã hóa thành tro bụi ra sao.
Bản thân từng đi trên con đường dài, tìm kiếm ánh sáng ở phía trước.
Tiếng nói ở bên ngoài đang gọi cô, đưa cô tiến về phía trước, dẫn dắt cô băng qua màn đêm dày đặc.
Giọng nói trong lòng đang nhắc nhở cô, những lời hứa chưa hoàn thành, những cuộc hẹn chưa kịp đến, những ước mơ chưa thành hiện thực, tất cả vẫn đang chờ cô...
Chúng chưa từng biến mất trong ngọn lửa, thay vào đó, lại càng tỏa sáng rực rỡ hơn giữa ngọn lửa.
"Đó chính là tôi..."
Cô ấy đứng ở điểm cuối, không quay đầu lưu luyến nữa...
"Tôi của trước đây, cũng là tôi hoàn toàn mới."
',
            'hp'=> '43',
            'attack'=> '21',
            'defend' => '30',
            'roll'=>'limit',
        ]);
        DB::table('lightcores')->insert([
            'name'=> 'Để Lời Từ Biệt Đẹp Đẽ Hơn',
            'subtile'=> 'Khắc Ghi',
            'effect' => 'Khiến Giới Hạn HP của người trang bị tăng 30%/37%/45%/52%/60%. Khi người trang bị hoặc Linh Hồn Ký Ức của người trang bị mất HP trong hiệp của mình, người trang bị sẽ nhận Hoa Âm Ty. Hoa Âm Ty khiến người trang bị và Linh Hồn Ký Ức của họ khi gây sát thương có thể bỏ qua 30%/35%/40%/45%/50% phòng thủ của mục tiêu, duy trì 2 hiệp. Khi Linh Hồn Ký Ức của người trang bị biến mất, người trang bị sẽ ưu tiên hành động 12%/15%/18%/21%/24%. Hiệu ứng này chỉ kích hoạt tối đa 1 lần, và sẽ được làm mới số lần mỗi khi người tràng bị thi triển Tuyệt Kỹ.',
            'rarity'=> 5,
            'path_id'=> 8,
            'image'=> 'Để_Lời_Từ_Biệt_Đẹp_Đẽ_Hơn_pnm26y',
            'desc'=> '"Lại một nghi thức chia ly nữa.
Cô gái bước đi trên ánh trăng vỡ vụn, đan vòng hoa tiễn biệt bên bờ sông.
Khúc bi ca cổ xưa đông cứng trong không khí lạnh lẽo, dòng sông tĩnh lặng chảy về miền hoa xa xôi.
Quyển sách nhuốm máu, thanh kiếm gỉ sét, chiếc khăn tay thêu vần thơ... cô tiếp nhận di vật và những câu chuyện họ để lại.
"Đôi mắt ta như thấu kính, mãi hoài niệm về bầu trời sao."
Đó là bia mộ dành cho vị học giả yểu mệnh.
"Đối với đời người hay cái chết, kỵ sĩ chỉ nhìn bằng một ánh mắt lạnh nhạt."
Đó là châm ngôn của chiến binh vô danh.
"Sinh mệnh chỉ là cái chết lấp lánh ánh sáng."
Đó là áng thơ cuối cùng của thi nhân theo đuổi sự vĩnh hằng, được viết nên bằng chính mạng sống của mình.
...
"Mỗi đóa hoa, đều từng kiêu hãnh khoe sắc..."
Cùng với tiếng nức nở của dòng sông, cô dâng lên người đã khuất những vần thơ, vòng hoa và sự tưởng niệm...
"Nếu héo úa là điều không thể tránh khỏi, ít nhất hãy để lời từ biệt của chúng ta... đẹp đẽ hơn một chút."
"',
            'hp'=> '57',
            'attack'=> '24',
            'defend' => '18',
            'roll'=>'limit',
        ]);
    }
}
