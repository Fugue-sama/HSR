import React, { useRef } from 'react';
import { getImage } from '../../../../../Utils/getImagePath';

function OrnamentForm({ ornaments, ornamentOpen, setOrnamentOpen, data, setData, toggleSelection, ornamentRef }) {
    return (
        <div className="relative" ref={ornamentRef}>
            <label className="block text-sm font-medium text-[#d4b990]">
                Trang sức
            </label>
            <div
                onClick={() => setOrnamentOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.ornaments.length > 0
                        ? data.ornaments
                            .map((id) => ornaments.find((o) => o.id === id)?.name)
                            .filter(Boolean) // Loại bỏ undefined nếu không tìm thấy
                            .join(", ")
                        : "-- Chọn trang sức --"}
                </span>
            </div>
            {ornamentOpen && (
                <ul className="absolute z-10 mt-1 bottom-full w-full text-[#929897] bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {ornaments.map((ornament) => (
                      <li
                      key={ornament.id}
                      onClick={() => toggleSelection("ornaments", ornament.id)}
                      className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 rounded ${
                        data.ornaments.includes(ornament.id) ? "bg-gray-700" : ""
                      }`}
                    >
                      <img className="h-10 w-10 object-contain" src={getImage(ornament.image)} alt={ornament.name} />
                      <span className="text-sm">{ornament.name}</span>
                    </li>
                    ))}
                    {data.ornaments.length > 0 && (
                        <li
                            onClick={() => toggleSelection("ornaments", "none")}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-red-500"
                        >
                            Bỏ chọn tất cả
                        </li>
                    )}
                </ul>
            )}
            {/* Hiển thị lỗi nếu có */}
        </div>
    );
}

export default OrnamentForm;