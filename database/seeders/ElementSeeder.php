<?php

namespace Database\Seeders;

use App\Models\Element;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ElementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('elements')->insert([
            'name' => '<span style="color: red;">Hỏa</span>',
            'image_id' => 'nguyen-to-hoa_oznjcb',
            'damage' => 'Cao nhất',
            'debuff' => 'Thiêu Đốt',
            'dot'=> '&#10004;',
            'description' => 'Gây sát thương theo thời gian kéo dài trong 2 lượt.<p>Khi dùng <span style="color: #f99b1c;">thuộc tính Hỏa</span> gây ra <span style="color: #f99b1c;">Phá Vỡ Điểm Yếu</span>, sẽ gây sát thương thuộc tính Hỏa, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Thiêu Đốt</span>. <span style="color: #f99b1c;">Thiêu Đốt</span> có thể gây ra sát thương duy trì thuộc tỉnh Hỏa. Thiêu Đốt sẽ gây sát thương Hỏa duy trì khi bắt đầu hiệp của kẻ địch.</p><p>Sát Thương <span style="color: #f99b1c;">Thiêu Đốt</span> được áp dụng lên kẻ địch sau khi tiến vào trạng thái Phá Vỡ Điểm Yếu, gây ra Sát Thương Duy Trì hệ <span style="color: #f99b1c;">Hỏa</span> mỗi khi bắt đầu hiệp. <span style="color: #f99b1c;">Sát Thương Thiêu Đốt</span> Cơ Bản gây ra phụ thuộc vào cấp độ nhân vật và trạng thái kẻ địch.</p>',
        ]);
        DB::table('elements')->insert([
            'name' => '<span style="color: #96d8f4;">Băng</span></span>',
            'image_id' => 'nguyen-to-bang_tc9bbg',
            'damage' => 'Trung Bình',
            'debuff' => 'Đóng Băng',
            'dot'=> ' &#10008;',
            'description' => 'Gây sát thương và đóng băng kẻ địch trong 1 lượt. Sau khi kẻ địch tan băng, nó sẽ bỏ qua 1 lượt nhưng hành động của nó sẽ được tiến lên 50%.<p>Khi dùng <span style="color: #f99b1c;">thuộc tính Băng</span> gây ra Phá Vỡ Điểm Yếu, sẽ gây <span style="color: #f99b1c;">Sát Thương Băng</span>, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Đóng Băng</span>. <span style="color: #f99b1c;">Đóng Băng</span> khiến kẻ địch không thể hành động, gây ra <span style="color: #f99b1c;">Sát Thương Băng</span> kèm theo.</p><p>Kẻ địch bị <span style="color: #f99b1c;">Đóng Băng</span> bắt đầu hiệp sẽ thoát khỏi trạng thái Đóng Băng và vẫn đang ở trạng thái Phá Vỡ Điểm Yếu, nhận thêm <span style="color: #f99b1c;">Sát Thương Băng</span> kèm theo dựa trên <span style="color: #f99b1c;">Cấp Độ</span> và <span style="color: #f99b1c;">Tấn Công Kích Phá</span> của nhân vật gây ra sát thương Phá Vỡ Điểm Yếu, đồng thời bị mất lượt và được tăng 50% thanh <span style="color: #f99b1c;">Thứ Tự Hành Động</span>.</p>',
        ]);
        DB::table('elements')->insert([
            'name' => '<span style="color: #d377e5;">Lôi</span>',
            'image_id' => 'nguyen-to-loi_utlp0q',
            'damage' => 'Trung Bình',
            'debuff' => 'Sốc Điện',
            'dot'=> '&#10004;',
            'description' => 'Gây sát thương theo thời gian kéo dài trong 2 lượt.<p>Khi dùng <span style="color: #f99b1c;">thuộc tính Lôi</span> gây ra Phá Vỡ Điểm Yếu, sẽ gây sát thương thuộc tính <span style="color: #f99b1c;">Lôi</span>, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Sốc Điện</span>. <span style="color: #f99b1c;">Sốc Điện</span> có thể gây ra sát thương duy trì thuộc tỉnh Lôi.</p><p><span style="color: #f99b1c;">Sát Thương Sốc Điện</span> được áp dụng lên kẻ địch sau khi tiến vào trạng thái Phá Vỡ Điểm Yếu, gây ra <span style="color: #f99b1c;">Sát Thương Duy Trì hệ Lôi</span> mỗi khi bắt đầu hiệp. <span style="color: #f99b1c;">Sát Thương Sốc Điện Cơ Bản</span> gây ra phụ thuộc vào cấp độ nhân vật và trạng thái kẻ địch.</p>',
        ]);
        DB::table('elements')->insert(values: [
            'name' => '<span style="color: #75d4a1;">Phong</span>',
            'image_id' => 'nguyen-to-phong_q32dyk',
            'damage' => 'Cao',
            'debuff' => 'Bào Mòn',
            'dot'=> '&#10004;',
            'description' => 'Gây sát thương theo thời gian kéo dài trong 2 lượt (có thể xếp chồng lên đến 5 lần).<p>Khi dùng <span style="color: #f99b1c;">thuộc tỉnh Phong</span> gây ra Phá Vỡ Điểm Yếu, sẽ gây sát thương thuộc tính Phong, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Bào Mòn</span>. <span style="color: #f99b1c;">Bào Mòn</span> có thể gây ra sát thương duy trì thuộc tính Phong.</p><p><span style="color: #f99b1c;">Sát Thương Bào Mòn</span> được áp dụng lên kẻ địch sau khi tiến vào trạng thái Phá Vỡ Điểm Yếu, gây ra <span style="color: #f99b1c;">Sát Thương Duy Trì hệ Phong</span> mỗi khi bắt đầu hiệp. <span style="color: #f99b1c;">Sát Thương Bào Mòn Cơ Bản</span> gây ra phụ thuộc vào cấp độ nhân vật và trạng thái kẻ địch.</p>',
        ]); 
        DB::table('elements')->insert([ 
            'name' => '<span style="color: #bdbebe;">Vật Lý</span>',
            'image_id' => 'vat-ly_yuwbqa',
            'damage' => 'Cao Nhất',
            'debuff' => 'Chảy Máu',
            'dot'=> '&#10004;',
            'description' => 'Gây sát thương theo thời gian (dựa trên lượng HP tối đa của kẻ địch) kéo dài trong 2 lượt.<p>Khi dùng <span style="color: #f99b1c;">thuộc tính Vật Lý</span> gây ra <span style="color: #f99b1c;">Phá Vỡ Điểm Yếu</span>, sẽ gây sát thương thuộc tỉnh Vật Lý, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Chảy Máu</span>. <span style="color: #f99b1c;">Chảy Máu</span> có thể gây ra sát thương duy trì thuộc tính Vật Lý. Chảy Máu sẽ gây sát thương Vật Lý duy trì <span style="color: #f99b1c;">khi bắt đầu hiệp</span> của kẻ địch dựa trên <span style="color: #f99b1c;">tỷ lệ Giới Hạn HP nhất định của kẻ địch</span>.</p><p>Sát Thương Chảy Máu được áp dụng lên kẻ địch sau khi tiến vào trạng thái Phá Vỡ Điểm Yếu, gây ra <span style="color: #f99b1c;">Sát Thương Duy Trì hệ Vật Lý</span> mỗi khi bắt đầu hiệp.</p>',
        ]);
        DB::table('elements')->insert([
            'name' => '<span style="color: #f9ee82;">Số Ảo</span>',
            'image_id' => 'so-ao_seheab',
            'damage' => 'None',
            'debuff' => 'Giam Cầm',
            'dot'=> ' &#10008;',
            'description' => 'Trì hoãn hành động của kẻ địch dựa trên chỉ số Hiệu Quả Phá và giảm Tốc Độ của chúng đi 10% trong 1 lượt.<p>Khi dùng <span style="color: #f99b1c;">Thuộc Tính Số Ảo</span> gây Phá Vỡ Điểm Yếu, sẽ gây <span style="color: #f99b1c;">Sát Thương Số Ảo,</span> đồng thời thêm trạng thái <span style="color: #f99b1c;">Giam Cầm</span>, <span style="color: #f99b1c;">Giam Cầm</span> sẽ khiến kẻ địch trì hoãn hành động và giảm tốc.</p><p>Phá Vỡ Điểm Yếu – Số Ảo khiến mục tiêu rơi vào <span style="color: #f99b1c;">Giam Cầm</span> và mất 1 lượt, kéo dài thời gian <span style="color: #f99b1c;">Hiệu Ứng Xấu</span> đang có nhưng cũng giảm một nửa <span style="color: #f99b1c;">Sát Thương Duy Trì</span> phải nhận.</p>',
        ]);
       
        DB::table('elements')->insert([
            'name' => '<span style="color: #756dd4;">Lượng tử</span>',
            'image_id' => 'nguyen-to-luong-tu_fxemtl',
            'damage' => 'Thấp',
            'debuff' => 'Nhiễu Loạn',
            'dot'=> ' &#10008;',
            'description' => 'Gây sát thương (dựa trên lượng Độ Bền tối đa của kẻ địch) và trì hoãn hành động của kẻ địch dựa trên chỉ số Hiệu Quả Phá. Áp dụng 1 cộng dồn mỗi khi kẻ địch bị tấn công (tối đa 5 cộng dồn).<p>Khi dùng <span style="color: #f99b1c;">thuộc tính Lượng Tử</span> gây ra Phá Vỡ Điểm Yếu, sẽ gây sát thương thuộc tính Lượng Tử, đồng thời thi triển trạng thái <span style="color: #f99b1c;">Nhiễu Loạn</span>. <span style="color: #f99b1c;">Nhiễu Loạn</span> khiến kẻ địch <span style="color: #f99b1c;">Trì Hoãn Hành Động</span>. Khi bắt đầu hiệp kế tiếp sẽ gây sát thương Lượng Tử kèm theo lên kẻ địch, khi kẻ địch chịu tấn công, sẽ tăng lượng sát thương này.</p>Sau khi Phá Vỡ Điểm Yếu – Lượng Tử, kẻ địch sẽ bị những hiệu ứng sau: 
            <span>&#10061; Hành động của mục tiêu bị trì hoãn thêm 20% (tăng theo Tấn Công Kích Phá) với tổng độ trễ là 45% + 0,2*[Tấn Công Kích Phá]</span>.  
            <span>&#10061;   1 tầng Nhiễu Loạn được áp dụng cho mục tiêu, bất kỳ đòn tấn công nào tiếp theo sẽ gây sát thương cho mục tiêu sẽ tích lũy thêm một điểm cộng dồn (tối đa 5 điểm). Khi lượt của mục tiêu bắt đầu, tất cả điểm Nhiễu Loạn sẽ phát nổ để gây thêm sát thương Lượng Tử cực lớn.</span>',
        ]);
    }
}
