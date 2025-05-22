import React from 'react';
import parse from "html-react-parser"

function ElementForm({ elements, data, setData, errors, elementOpen, setElementOpen, elementRef }) {
    return (
        <div ref={elementRef} className="relative">
            <label className='block text-sm font-medium text-[#d4b990]'>
                Nguyên tố
            </label>
            <div
                onClick={() => setElementOpen((o) => !o)}
                className="mt-1 w-full flex items-center justify-between text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 cursor-pointer bg-transparent"
            >
                <span>
                    {data.element_id
                        ? 
                        parse(elements.find((e) => e.id === parseInt(data.element_id))?.name)
                        : "-- Chọn nguyên tố --"}
                </span>
            </div>
            {elementOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-[#282828] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto customScroll">
                    {elements.map((element, idx) => (
                        <li
                            key={idx}
                            onClick={() => setData("element_id", element.id)}
                            className={`flex items-center px-4 py-2 cursor-pointer ${
                                data.element_id === element.id ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            {element.image_url && (
                                <img
                                    src={element.image_url}
                                    alt={element.name}
                                    className="h-6 w-6 mr-2 rounded-full object-cover"
                                />
                            )}
                            <span className="text-[#cfb68e]">{parse(element.name)}</span>
                        </li>
                    ))}
                    {/* Thêm tùy chọn "Bỏ chọn" nếu đã có element được chọn */}
                    {data.element_id && (
                        <li
                            onClick={() => setData("element_id", null)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-red-500"
                        >
                            Bỏ chọn
                        </li>
                    )}
                </ul>
            )}
            {errors.element_id && (
                <div className="text-red-500 text-sm mt-1">
                    {errors.element_id}
                </div>
            )}
        </div>
    );
}
export default ElementForm;
