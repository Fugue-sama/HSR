// Components/LightcoreForm.jsx
import React, { useRef } from 'react';
import { getImage } from '../../../../../Utils/getImagePath';

function LCForm({ lightcores, lightcoreOpen, setLightcoreOpen, data, setData, toggleSelection, lightcoreRef }) {
    return (
        <div className="relative" ref={lightcoreRef}>
            <label className="block text-sm font-medium text-[#d4b990]">
                Nón Ánh Sáng
            </label>
            <div
                onClick={() => setLightcoreOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.lightcores.length > 0
                        ? data.lightcores
                            .map((id) => lightcores.find((lc) => lc.id === id)?.name)
                            .filter(Boolean)
                            .join(", ")
                        : "-- Chọn Nón Ánh Sáng --"}
                </span>
            </div>
            {lightcoreOpen && (
                <ul className="absolute z-10 bottom-full mt-1 w-full text-[#929897] bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {lightcores.map((lightcore) => (
                       <li
                       key={lightcore.id}
                       onClick={() => toggleSelection("lightcores", lightcore.id)}
                       className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 rounded ${
                         data.lightcores.includes(lightcore.id) ? "bg-gray-700" : ""
                       }`}
                     >
                       <img className="h-10 w-10 object-contain" src={getImage(lightcore.image)} alt={lightcore.name} />
                       <span className="text-sm">{lightcore.name}</span>
                     </li>
                    ))}
                    {data.lightcores.length > 0 && (
                        <li
                            onClick={() => toggleSelection("lightcores", "none")}
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

export default LCForm;