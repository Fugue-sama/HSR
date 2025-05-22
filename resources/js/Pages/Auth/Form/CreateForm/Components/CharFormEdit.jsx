import React from "react"
import { getImage } from "../../../../../Utils/getImagePath"

function CharForm({ charRef, data, setCharOpen, charOpen, errors, characters, toggleSelection }) {
    return (
        <div className="relative" ref={charRef} title='Trường hợp chỉnh sửa thì chỉ cần chọn nhân vật mới'>
            <label className="block text-sm font-medium text-[#d4b990]" >
                Nhân vật đề xuất sử dụng
            </label>
            <div
                onClick={() => setCharOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-center text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span className="text-center">
                    {data.characters.length ? characters.filter((c) => data.characters.includes(c.id.toString())).map((c) => c.name).join(", ")
                        : "-- Chọn nhân vật --"}
                </span>
            </div>
            {charOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    
                        {/* Các nhân vật hiện tại */}
                        {characters.map((c, idx) => (
                            <li
                                key={idx}
                                onClick={() =>
                                    toggleSelection("characters", c.id.toString())
                                }
                                className={`px-4 py-2 cursor-pointer  ${data.characters.includes(c.id.toString()) ? "bg-gray-700": "hover:bg-gray-700"
                                }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={getImage(c.image)}
                                        alt={c.name}
                                        className="h-20 w-15 mr-2"
                                    />
                                    <span className="text-[#cfb68e]">{c.name}</span>
                                </div>
                            </li>
                        ))}
                        <li
                        onClick={() => toggleSelection("characters", "none")}
                        className={`px-4 py-2 cursor-pointer ${
                            !data.characters.length ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <span className="text-[#cfb68e]"> Cập nhật sau</span>
                        </div>
                    </li>

                </ul>
            )}
            {errors.characters && (
                <div className="text-red-500 text-sm mt-1">
                    {errors.characters}
                </div>
            )}
        </div>
    )
}

export default CharForm
