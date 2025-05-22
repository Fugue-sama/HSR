// Components/RelicForm.jsx
import React, { useRef } from 'react';
import { getImage } from '../../../../../Utils/getImagePath';

function RelicForm({ relics, relicOpen, setRelicOpen, data, setData, toggleSelection, relicRef }) {
    return (
        <div className="relative" ref={relicRef}>
            <label className="block text-sm font-medium text-[#d4b990]">
                Di vật
            </label>
            <div
                onClick={() => setRelicOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.relics.length > 0
                        ? data.relics
                            .map((id) => relics.find((r) => r.id === id)?.name)
                            .filter(Boolean)
                            .join(", ")
                        : "-- Chọn di vật --"}
                </span>
            </div>
            {relicOpen && (
                <ul className="absolute z-10 bottom-full mt-1 w-full bg-[#282828] border text-[#929897] border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {relics.map((relic) => (
                    <li
                       key={relic.id}
                       onClick={() => toggleSelection("relics", relic.id)}
                       className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 rounded ${
                         data.relics.includes(relic.id) ? "bg-gray-700" : ""
                       }`}
                     >
                       <img className="h-10 w-10 object-contain" src={getImage(relic.image)} alt={relic.name} />
                       <span className="text-sm">{relic.name}</span>
                     </li>
                    ))}
                    {data.relics.length > 0 && (
                        <li
                            onClick={() => toggleSelection("relics", "none")}
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

export default RelicForm;

