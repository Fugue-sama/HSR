import React from "react";

function TypeForm({typeRef, typeOpen, setTypeOpen, data, errors, toggleSelection}) {
    console.log(data.type)
    const types = [
            'Tấn Công',
            'Phòng Thủ',
            'HP',
            'Tốc Độ',
            'Tỷ Lệ Bạo Kích',
            'Khiên',
            'Trị Liệu',
            'Tấn Công Thường, Chiến Kỹ, Tuyệt Kỹ',
            'Đòn Đánh Theo Sau',
            'Sát Thương Bạo Kích',
            'Chính Xác Hiệu Ứng',
            'Bỏ Qua Phòng Thủ',
            'Tấn Công Kích Phá',
            'Điểm Chiến Kỹ',
            'Năng Lượng',
            'Hiệu Suất Hồi Năng Lượng',
            'Ưu Tiên Hành Động',
            'Giảm Sát Thương Phải Chịu',
            'Sát Thương Thuộc Tính',
            'Lượng Trị Liệu',
            'Sát thương phe ta tăng',
            'Kháng Hiệu Ứng',
            'Giảm Phòng Thủ',
        ]
    return (
        <div className="relative" ref={typeRef} title='Trường hợp chỉnh sửa thì chỉ cần chọn cái mới'>
            <label className="block text-sm font-medium text-[#d4b990]">
                Cơ chế
            </label>
            <div
                onClick={() => setTypeOpen((o) => !o)}
                className="mt-1 w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.type.length
                        ? data.type.join(", ")
                        : "-- Chọn cơ chế --"}
                </span>
            </div>
            {typeOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {types.map((t, idx) => {
                         return (
                            <li
                            key={idx}
                            onClick={() => toggleSelection("type", t)}
                            className={`px-4 py-2 cursor-pointer ${
                                data.type.includes(t)
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            <span className="text-[#cfb68e]">{t}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
            {errors.type && (
                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
            )}
        </div>
    );
}

export default TypeForm;
