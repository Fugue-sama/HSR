import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Set({setOpen, setSetOpen,setCheckeds, setSetCheckeds, countSet, setCountSet, handleAccept}) {
    const sets = ["Bộ 2", "Bộ 4"]
    const handleSetChecked = (set) => {
    setSetCheckeds((prev) => {
        const update = { ...prev, [set]: !prev[set] };
        setCountSet(Object.values(update).filter(Boolean).length);
        return update;
    })
  }

  const handleResetSet = ((set) => {
    setSetCheckeds((prev) => {
        const update = { ...prev, [set]: !prev[set] };
        setCountSet(Object.values(update).filter(Boolean).length);
        return update;
    })
  }, [])
  const selectedSets = Object.keys(setCheckeds).filter( (key) => setCheckeds[key])

    return (
        <>
            <div className="border-[rgba(219,194,145,0.9)] w-[15rem]">
                <div className="relative" tabIndex={0}>
                    <div
                        className={`trigger ${
                            setOpen
                                ? "opening"
                                : "text-[#ffffff73] border-[#ffffff14]"
                        }`}
                        onClick={() => setSetOpen(!setOpen)}
                    >
                        <span className="text-[1.1rem] whitespace-nowrap overflow-hidden text-ellipsis block">
                            {selectedSets.length > 0
                                ? selectedSets.join(", ")
                                : "Bộ"}
                        </span>
                        <div className="flex items-center gap-1">
                            {countSet > 1 && <span>{`(${countSet})`}</span>}
                            <ChevronDownIcon
                                className={`w-5 h-5 transition-transform duration-300 ${
                                    setOpen ? "rotate-180 text-[#d4bf92]" : ""
                                }`}
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {setOpen && (
                            <motion.div
                                key="dropdown"
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeIn",
                                }}
                                className="absolute w-full bg-[#121212] top-full rounded shadow-lg overflow-hidden"
                            >
                                <div className="listt-toggle max-h-[18rem]">
                                    {sets.map((set) => (
                                        <div
                                            key={set}
                                            className="option-item rounded-[8px]"
                                        >
                                            <label className="flex justify-between items-center gap-2 cursor-pointer select-none">
                                                <span
                                                    className={
                                                        setCheckeds[set]
                                                            ? "text-[#d4bf92]"
                                                            : ""
                                                    }
                                                >
                                                    {set}
                                                </span>

                                                <span className="relative inline-block">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            !!setCheckeds[set]
                                                        }
                                                        onChange={() =>
                                                            handleSetChecked(
                                                                set
                                                            )
                                                        }
                                                        className="peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-md checked:border-[#d4bf92] transition-all flex items-center"
                                                    />
                                                    <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-transparent peer-checked:text-[#d4bf92] transition-colors" />
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center text-white text-sm px-4 py-2 border-t border-gray-700">
                                    <button
                                        className="btn border rounded-[2rem] px-4 py-1 text-[#ffffff99]"
                                        onClick={() => handleResetSet()}
                                    >
                                        Đặt lại
                                    </button>
                                    <button
                                        className="btn border rounded-[2rem] px-4 py-1 text-[#d4bf92]"
                                        onClick={() => handleAccept()}
                                    >
                                        Đồng ý
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default Set;
