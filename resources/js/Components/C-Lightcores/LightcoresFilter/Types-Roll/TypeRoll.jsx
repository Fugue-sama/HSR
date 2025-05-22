import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"

function TypeRoll({
    isOpen,
    setIsOpen,
    checkedItems,
    setCheckedItems,
    countOption,
    setCountOption,
    handleAccept,
    setOpen,
    setSetOpen,
    setCheckeds,
    setSetCheckeds,
    countSet,
    setCountSet,
}) {
    const options = [
        "Tấn Công", "Phòng Thủ", "HP", "Tốc Độ", "Tỷ Lệ Bạo Kích", "Khiên",
        "Trị Liệu", "Tấn Công Thường, Chiến Kỹ, Tuyệt Kỹ", "Sát Thương Bạo Kích",
        "Chính Xác Hiệu Ứng", "Bỏ Qua Phòng Thủ", "Tấn Công Kích Phá",
        "Điểm Chiến Kỹ", "Năng Lượng", "Hiệu Suất Hồi Năng Lượng",
        "Ưu Tiên Hành Động", "Giảm Sát Thương Phải Chịu", "Sát Thương Thuộc Tính",
        "Lượng Trị Liệu", "Sát thương phe ta tăng", "Kháng Hiệu Ứng", "giảm Phòng Thủ",
    ]
    const sets = [{type: 'limit', name:"Bước Nhảy Giới Hạn"}, {type: 'both', name:"Bước Nhảy Vĩnh Viễn"}]

    const handleCheckboxChange = (option) => {
        setCheckedItems((prev) => {
            const update = { ...prev, [option]: !prev[option] }
            setCountOption(Object.values(update).filter(Boolean).length)
            return update
        })
    }

    const handleResetOption = () => {
        console.log('reset')
        setCheckedItems({})
        setCountOption(0)
    }

    const handleSetChecked = (set) => {
        setSetCheckeds((prev) => {
            const update = { ...prev, [set]: !prev[set] }
            setCountSet(Object.values(update).filter(Boolean).length)
            return update
        })
    }

    const handleResetSet = () => {
        setSetCheckeds({})
        setCountSet(0)
    }

    const selectedOptions = Object.keys(checkedItems).filter((key) => checkedItems[key])
    const selectedSets = Object.keys(setCheckeds).filter((key) => setCheckeds[key])

    return (
        <div className="w-4/5 flex flex-col gap-2.5">
            <div className="w-full flex items-center gap-5 py-2">
                <p className="w-1/5 text-[#8f959c] text-[1rem] font-bold">Lọc</p>
                <div className="flex justify-between w-1/2 gap-4">
                    {/* Dropdown: Kỹ năng */}
                    <div className=" relative w-[40%]" tabIndex={0}>
                        <div
                            className={`flex justify-between items-center px-4 py-1 rounded-tr-lg bg-[#00000052] border cursor-pointer ${
                                isOpen ? "border-[#d4bf92] text-[#d4bf92]" : "text-white/45 border-white/10"
                            }`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="truncate text-[1.1rem]">
                                {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Loại Kỹ Năng"}
                            </span>
                            <div className="flex items-center gap-1">
                                {countOption > 0 && <span>({countOption})</span>}
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180 text-[#d4bf92]" : ""}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                    className="absolute z-10 w-full bg-[#121212] top-full mt-1 rounded shadow-lg"
                                >
                                    <div className="max-h-72 overflow-y-auto px-3 py-2 lightcores-toggle ">
                                        {options.map((option) => (
                                            <label key={option} className="option-item flex justify-between items-center gap-2 py-1 cursor-pointer select-none">
                                                <span className={checkedItems[option] ? "text-[#d4bf92]" : ''}>{option}</span>
                                                <span className="relative inline-block">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!checkedItems[option]}
                                                        onChange={() => handleCheckboxChange(option)}
                                                        className="flex peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-md checked:border-[#d4bf92] transition-all"
                                                    />
                                                    <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-transparent peer-checked:text-[#d4bf92]" />
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-white text-sm px-4 py-2 border-t border-gray-700">
                                        <button className="btn rounded-full px-4 py-1 text-white/60 border" onClick={handleResetOption}>
                                            Đặt lại
                                        </button>
                                        <button className="btn rounded-full px-4 py-1 text-[#d4bf92] border" onClick={handleAccept}>
                                            Đồng ý
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dropdown: Bộ */}
                    <div className="relative w-[15rem]" tabIndex={0}>
                        <div
                            className={`flex justify-between items-center px-4 py-1 rounded-tr-lg bg-[#00000052] border cursor-pointer ${
                                setOpen ? "border-[#d4bf92] text-[#d4bf92]" : "text-white/45 border-white/10"
                            }`}
                            onClick={() => setSetOpen(!setOpen)}
                        >
                            <span className="truncate text-[1.1rem]">
                                {selectedSets.length > 0 ? selectedSets.join(", ") : "Cách Nhận"}
                            </span>
                            <div className="flex items-center gap-1">
                                {countSet > 1 && <span>({countSet})</span>}
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${setOpen ? "rotate-180 text-[#d4bf92]" : ""}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {setOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                    className="absolute z-10 w-full bg-[#121212] top-full mt-1 rounded shadow-lg"
                                >
                                    <div className="max-h-72 overflow-y-auto px-3 py-2 lightcores-toggle">
                                        {sets.map((set) => (
                                            <label key={set.type} className="flex justify-between items-center gap-2 py-1 cursor-pointer select-none">
                                                <span className={setCheckeds[set.type] ? "text-[#d4bf92]" : 'text-[#959997]'}>{set.name}</span>
                                                <span className="relative inline-block">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!setCheckeds[set.type]}
                                                        onChange={() => handleSetChecked(set.type)}
                                                        className="flex peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-md checked:border-[#d4bf92] transition-all"
                                                    />
                                                    <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-transparent peer-checked:text-[#d4bf92]" />
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-white text-sm px-4 py-2 border-t border-gray-700">
                                        <button className="btn rounded-full px-4 py-1 text-white/60 border" onClick={handleResetSet}>
                                            Đặt lại
                                        </button>
                                        <button className="btn rounded-full px-4 py-1 text-[#d4bf92] border" onClick={handleAccept}>
                                            Đồng ý
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypeRoll
