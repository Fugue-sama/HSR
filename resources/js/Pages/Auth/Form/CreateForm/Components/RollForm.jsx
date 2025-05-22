import React from "react"
import { getImgCardlist } from "../../../../../Utils/getImagePath"

function RollForm({ rollOpen, setRollOpen, data, setData, errors, rollRef }) {
    const rolls = [
        { name: "Vòng quay vĩnh viễn", image: "regular.webp", type: "both" },
        { name: "Vòng quay giới hạn", image: "limit.webp", type: "limit" },
    ]

    const handleSelect = (value) => {
        setData("roll", value)
        setRollOpen(false) 
    }

    return (
        <div className="relative" ref={rollRef}>
            <label className="block text-sm font-medium text-[#d4b990]">
                Vòng quay
            </label>
            <div
                onClick={() => setRollOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {
                        rolls.find((r) => r.type === data.roll)?.name ||
                        "-- Chọn vòng quay --"
                    }
                </span>
            </div>
            {rollOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {rolls.map((r, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(r.type)}
                            className={`flex items-center px-4 py-2 cursor-pointer ${
                                data.roll === r.type
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            <img
                                src={getImgCardlist(r.image)}
                                alt={r.name}
                                className="h-6 w-6 mr-2"
                            />
                            <span className="text-[#cfb68e]">{r.name}</span>
                        </li>
                    ))}
                </ul>
            )}
            {errors.roll && (
                <div className="text-red-500 text-sm mt-1">{errors.roll}</div>
            )}
        </div>
    )
}

export default RollForm
