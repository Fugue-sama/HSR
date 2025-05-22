<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PathSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('paths')->insert([
        //     'desc'=> '"Sự ra đời của mỗi Aeon đều mang ý nghĩa mở ra một "Vận Mệnh". Bản chất của Vận Mệnh vẫn là một bí ẩn, chúng ta chỉ cần dùng cách mà người thường có thể lý giải để tiến hành suy luận: Chính là "khái niệm" của loại triết học nào đó." -Himeko<br>Vận Mệnh cô đọng từ Năng Lượng Số Ảo, sinh ra như những biểu hiện của các khái niệm triết học phổ quát. Những người tin tưởng và hiện thực hóa khái niệm của một vận mệnh sẽ được gọi là Hành Giả Vận Mệnh. Vận mệnh mà họ đi theo sẽ có sự thay đổi tùy thuộc vào triết lý và quan điểm của riêng họ. Trong một số trường hợp đặc biệt, thực thể có thể hoàn toàn hòa quyện bản thân vào với vận mệnh và khám phá khái niệm triết học của nó cho tới cùng cực sẽ trở thành Aeon.'
        // ]);
        DB::table('paths')->insert([
            'name'=> 'Hủy Diệt', 
            'aeon'=> 'Nanook - The Ruin Author',
            'aeon_img'=> 'nanook_dva47r',
            'image'=> 'huy-diet_v8uooz',
            'pathDesc' => 'Sự ra đời của vũ trụ là một sai lầm. Nếu nền văn minh là một thứ ung thư nảy sinh lặng lẽ giữa muôn ngàn vì sao, thì chiến tranh chính là thứ ngôn ngữ chung duy nhất mà mọi sinh mệnh thông minh đều hiểu.',
           'mechDesc' => 'Cơ chế <span class="text-highlight"><b>tấn công và sinh tồn</b></span> phi thường, có thể thích nghi với nhiều môi trường chiến đấu khác nhau. Khả năng thích nghi với môi trường chiến đấu biến Hủy Diệt thành một chiến binh không thể bị ngăn cản, dù là trong chiến tranh khốc liệt hay môi trường đầy nguy hiểm.',
        ]);
        DB::table('paths')->insert([
            'name'=> 'Săn Bắn', 
            'aeon'=> 'Lan - God of the Skybow',
            'aeon_img'=> 'lan_lhbqkm',
            'image'=> 'san-ban_iwadua',
            'pathDesc' => 'Với lòng căm thù vô tận và chiến tranh không biên giới, bạn gánh vác bao nhiêu lo âu? Với ánh mắt kiên định và mũi tên đã giương, Reignbow Arbiter không cần phải ngoái lại.',
            'mechDesc' => 'Ưu điểm <span class="text-highlight"><b>tấn công đơn thể</b></span> phi phàm, là sức mạnh tấn công chủ yếu để chiến thắng Kẻ Địch Tinh Anh. Không chỉ là một kỹ năng tấn công chính xác mà còn là khả năng tiêu diệt mục tiêu với một đòn chí mạng.  Khi đối mặt với kẻ địch mạnh mẽ nhất.'
        ]);
        DB::table('paths')->insert([
            'name'=> 'Tri Thức', 
            'aeon'=> 'Nous - Unknow',
            'aeon_img'=> 'nous_h9ovzg',
            'image'=> 'tri-thuc_jm4tkq',
            'pathDesc' => 'Nếu sự thật của vũ trụ là tàn nhẫn và cũ kỹ, bạn vẫn khao khát câu trả lời cho câu hỏi tối thượng chứ?',
          'mechDesc' => 'Có khả năng <span class="text-highlight"><b>tấn công nhóm</b></span> nổi trội, chỉ cần ra một đòn có thể bắt trọn nhiều kẻ địch. Khi chiến đấu, Tri Thức có thể đánh bại nhiều đối thủ trong một lần ra tay, đồng thời làm giảm khả năng chiến đấu của chúng, khiến kẻ địch không kịp phản ứng, để đội ngũ có thể chiếm ưu thế nhanh chóng.'
        ]);
        DB::table('paths')->insert([
            'name'=> 'Hòa Hợp', 
            'aeon'=> 'Xipe - The Mother of All Stars',
            'aeon_img'=> 'xipe_nwnrdj',
            'image'=> 'hoa-hop_kaujne',
            'pathDesc' => 'Vô số sao băng vạch ngang bầu trời đêm... Nếu bạn chọn đúng một ngôi sao, nó sẽ mang điều ước của bạn đến hàng ngàn thế giới xa xôi.',
           'mechDesc' => 'Các <span class="text-highlight"><b>hiệu ứng buff</b></span> cho phe ta, giúp tăng sức chiến đấu toàn đội. Với khả năng mang lại sự hòa hợp hoàn hảo giữa các thành viên trong đội, không chỉ tăng cường sức mạnh mà còn làm cho mỗi chiến binh trong đội trở nên mạnh mẽ hơn, đồng thời tăng khả năng phục hồi và giảm thiểu thương vong.'
        ]);
        DB::table('paths')->insert([
            'name'=> 'Hư vô', 
            'aeon'=> 'IX - Unknow',
            'aeon_img'=> 'ix_fwqv58',
            'image'=> 'hu-vo_pzhu0j',
            'pathDesc' => 'Mọi tiến bộ hướng về hư vô, mọi kháng cự chống lại hư vô, tất cả sẽ trở thành hư vô...".',
           'mechDesc' => 'thi triển <span class="text-highlight"><b>Hiệu Ứng Xấu</b></span> lên kẻ địch, làm suy yếu sức chiến đấu của địch và giành lại ưu thế. Khả năng này giúp giảm khả năng tấn công và phòng thủ của kẻ địch, tạo cơ hội cho đồng đội tấn công mạnh mẽ hơn, làm thay đổi cục diện chiến đấu.'

        ]);
        DB::table('paths')->insert([
            'name'=> 'Bảo hộ', 
            'aeon'=> 'Qlipoth - The Amber Lord',
            'aeon_img'=> 'qlipoth_tpnwp2',
            'image'=> 'bao-ho_fwcw16',
            'pathDesc' => 'Nhà hiền triết ngắm nhìn thế giới, và thế giới cũng đáp lại ánh nhìn.',
           'mechDesc' => 'Có khả năng <span class="text-highlight"><b>tấn công và sinh tồn</b></span> phi thường, có thể thích nghi với nhiều môi trường chiến đấu khác nhau. Bằng cách tạo ra các lá chắn vững chắc và cung cấp sự bảo vệ cho đồng đội, khả năng của Bảo Hộ giúp đội ngũ duy trì sự sống và sức mạnh trong những tình huống nguy hiểm nhất.'
        ]);
        DB::table('paths')->insert([
            'name'=> 'Trù Phú', 
            'aeon'=> 'Yaoshi - The Ambrosial Arbor',
            'aeon_img'=> 'yaoshi_cgmdcz',
            'image'=> 'tru-phu_hewman',
            'pathDesc' => 'Hãy để cây trượng của người đập xuống mặt đất, lần này rồi lần nữa. Những chồi non sẽ vươn mình lên trời, và những giọt sương rơi xuống từ cành sẽ xua tan bệnh tật và chất độc.',
            'mechDesc' => 'Khả năng <span class="text-highlight"><b>Chữa lành (Healing)</b></span> vết thương cho phe ta, giúp đồng đội hồi phục. Ngoài ra, còn có khả năng <span class="text-highlight"><b>hồi sinh (Revival)</b></span> những đồng đội đã gục ngã, <span class="text-highlight"><b>loại bỏ hiệu ứng bất lợi (Debuff Cleanse)</b></span>, và <span class="text-highlight"><b>tăng khả năng hồi phục theo thời gian</b></span>, giúp đội hình duy trì sức sống bền bỉ trong suốt trận chiến.'
        ]);
        DB::table('paths')->insert([
            'name'=> 'Ký Ức', 
            'aeon'=> 'Fuli - Unknow',
            'aeon_img'=> 'fuli_epvlni',
            'image'=> 'ky-uc_xn7okj',
            'pathDesc' => 'Ký ức thuần khiết nhất là thứ bao dung nhất: Nó ghi lại mọi thứ mà không ghê tởm hay thiên vị. Nó vô tư lưu giữ mọi sự thật và mọi cử chỉ mê hoặc. Nó là một dòng sông được hình thành từ cuộc sống liên tục, một kho báu được xây dựng từ trí tuệ vĩnh cửu.',
           'mechDesc' => 'Khả năng triệu hồi Linh Hồn Ký Ức với <span class="text-highlight"><b>Năng Lực Đặc Biệt</b></span>, giúp tăng cường sức mạnh chiến đấu của đội. Linh Hồn này không chỉ hỗ trợ hồi phục và bảo vệ đồng đội mà còn có thể cung cấp các buff chiến đấu mạnh mẽ, tăng cường hiệu quả của các kỹ năng trong trận.'
        ]);
    }
}
