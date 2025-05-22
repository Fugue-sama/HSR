import React, { useState } from "react";
import { getImage } from "../../../../../Utils/getImagePath";

function PathForm({paths, data, setData, errors, pathOpen, setPathOpen, pathRef}) {
  
    return (
        <div className="relative" ref={pathRef} title='Trường hợp chỉnh sửa thì chỉ cần chọn cái mới'>
            <label className="block text-sm font-medium text-[#d4b990]">
                Vận mệnh
            </label>
            <div
                onClick={() => setPathOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.path_id
                        ? paths.find((p) => p.id === data.path_id)?.name
                        : "-- Chọn vận mệnh --"}
                </span>
            </div>
            {pathOpen && (
                <ul className="absolute z-10 mt-1 w-full  bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {paths.map((path) => (
                        <li
                            key={path.id}
                            onClick={() => {
                                setData("path_id", path.id)
                                setPathOpen(false)
                            }}
                            className={`flex items-center px-4 py-2 cursor-pointer ${
                                data.path_id === path.id
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            <img
                                src={getImage(path.image)}
                                alt={path.name}
                                className="h-6 w-6 mr-2"
                            />
                            <span className="text-[#cfb68e]">{path.name}</span>
                        </li>
                    ))}
                </ul>
            )}
            {errors.path_id && (
                <div className="text-red-500 text-sm mt-1">
                    {errors.path_id}
                </div>
            )}
        </div>
    );
}

export default PathForm;
