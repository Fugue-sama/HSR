    import React, { useRef, useState } from "react"
    import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
    import Hashids from "hashids"
    import { Link } from "@inertiajs/react"
    import { AnimatePresence, motion } from "framer-motion"
    import { getImage } from  "~utils/getImagePath"


    function Build({ pathID, relics, lightcores, ornaments }) {
        console.log(ornaments)
        const hashid = new Hashids("salt", 8)
        const path_line = [
            "destruction_wiv5vh",
            "hunt_znafvz",
            "erudition_ynmee7",
            "harmony_kvcpz1",
            "nihility_tc4cz3",
            "preservation_ywtbrn",
            "abundance_zgxpc8",
            "memory_vcdrqg",
        ]
        const path = path_line[pathID - 1]

        const [currentIndex, setCurrentIndex] = useState(0)
        const [prevIndex, setPrevIndex] = useState(0)
        const goTo = (newIndex) => {
            console.log("currentIndex", currentIndex, 'newIndex', newIndex)
            setPrevIndex(currentIndex)
            setCurrentIndex(newIndex)
        }

        const itemVariants = {
            initial: {
                opacity: 0,
                x: currentIndex > prevIndex ? 100 : -100,
                y: 10, // bắt đầu dịch lên một chút
                transition: { duration: 0.6, ease: "easeOut" }
            },
            animate: {
                opacity: 1,
                x: [20, -10, 0],
                transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    times: [0, 0.5, 1]
                }
            },
            exit: {
                opacity: 0,
                x: currentIndex > prevIndex ? 100 : -100,
                transition: { duration: 0.3, ease: "easeIn" }
            }
        }

        const [direction, setDirection] = useState(0)

        const sliderRef = useRef(null)
        const [type, setType] = useState("lightcores")

        const scroll = (direction) => {
            const amount = 300
            if (sliderRef.current) {
                sliderRef.current.scrollBy({
                    left: direction === "left" ? -amount : amount,
                    behavior: "smooth",
                })
            }
        }

        return (
            <>
                <div className="trace-content relative w-full h-full flex justify-center items-center">
                    {/* Background */}
                    <img
                        src="../../images/bgpath.png"
                        loading="lazy"
                        className="absolute w-full h-full select-none opacity-50"
                        alt=""
                    />
                    <img
                        src={getImage(path)}
                        loading="lazy"
                        className="absolute object-contain w-full h-full select-none"
                        alt=""
                    />

                    <div className="absolute left-0 top-0 flex justify-center mb-4 z-100">
                        <div
                            className={`${
                                type === "lightcores" ? "bg-white" : ""
                            } w-fit bg-[#ea973152] px-5 py-2 text-sm font-bold font-sans text-[#f29e38] flex items-center gap-2 cursor-pointer`}
                            onClick={() =>{ setType("lightcores"), goTo(0)}}
                        >
                            <svg
                                width="11"
                                height="13"
                                viewBox="0 0 11 13"
                                fill="#f29e38"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5 9.321v3.48L.227 10.045V4.562l3.01 1.72A3.5 3.5 0 015 9.322zM3.733 5.414A4.498 4.498 0 015.5 7.26a4.498 4.498 0 011.767-1.846L10.3 3.682 6.708 1.608 1.914 4.375l1.819 1.04zM5.5.911l.208.12L.909 3.8l-.208-.12L5.5.912zm5 3.808l.274-.157v5.483l-.274.158V4.719zm-.833.476L7.764 6.282A3.5 3.5 0 006 9.322V12.8l3.667-2.117v-5.49z"
                                    fill="#f29e38"
                                />
                            </svg>
                            <span className="font-bold">Nón ánh sáng</span>
                        </div>
                        <div
                            className={`${
                                type === "relics" ? "bg-white" : ""
                            } w-fit bg-[#ea973152] px-5 py-2 text-sm font-bold font-sans text-[#f29e38] flex items-center gap-2 cursor-pointer`}
                            onClick={() => {setType("relics"), goTo(1)}}
                        >
                            <svg
                                width="11"
                                height="13"
                                viewBox="0 0 11 13"
                                fill="#f29e38"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5 9.321v3.48L.227 10.045V4.562l3.01 1.72A3.5 3.5 0 015 9.322zM3.733 5.414A4.498 4.498 0 015.5 7.26a4.498 4.498 0 011.767-1.846L10.3 3.682 6.708 1.608 1.914 4.375l1.819 1.04zM5.5.911l.208.12L.909 3.8l-.208-.12L5.5.912zm5 3.808l.274-.157v5.483l-.274.158V4.719zm-.833.476L7.764 6.282A3.5 3.5 0 006 9.322V12.8l3.667-2.117v-5.49z"
                                    fill="#f29e38"
                                />
                            </svg>
                            <span className="font-bold">Bộ 4</span>
                        </div>
                        <div
                            className={`${
                                type === "ornaments" ? "bg-white" : ""
                            } w-fit bg-[#ea973152] px-5 py-2 text-sm font-bold font-sans text-[#f29e38] flex items-center gap-2 cursor-pointer`}
                            onClick={() => {setType("ornaments"), goTo(2) }}
                        >
                            <svg
                                width="11"
                                height="13"
                                viewBox="0 0 11 13"
                                fill="#f29e38"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5 9.321v3.48L.227 10.045V4.562l3.01 1.72A3.5 3.5 0 015 9.322zM3.733 5.414A4.498 4.498 0 015.5 7.26a4.498 4.498 0 011.767-1.846L10.3 3.682 6.708 1.608 1.914 4.375l1.819 1.04zM5.5.911l.208.12L.909 3.8l-.208-.12L5.5.912zm5 3.808l.274-.157v5.483l-.274.158V4.719zm-.833.476L7.764 6.282A3.5 3.5 0 006 9.322V12.8l3.667-2.117v-5.49z"
                                    fill="#f29e38"
                                />
                            </svg>
                            <span className="font-bold">Bộ 2</span>
                        </div>
                    </div>

                    {/* Nút trái */}
                    <button
                        onClick={() => scroll("left")}
                        className="hover:border-[#f29e38] border-gray-500 border cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#2d2f39] hover:bg-[#3d404e] rounded-full"
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-[#f29e38]" />
                    </button>

                    <AnimatePresence mode="wait">
                    <motion.div
                        initial={false}
                        custom={direction}
                        animate="animate"
                        exit="exit"
                        variants={itemVariants}
                        key={type}
                        ref={sliderRef}
                        className="slider w-full h-full relative flex gap-10 justify-center items-center px-12 mx-10 py-5 overflow-x-auto scroll-smooth"
                    >
                            {type === "relics" &&
                                relics.map((relic, idx) => (
                                    <Link key={idx} href={route("relic.detail",hashid.encode(relic.id))}
                                    className="block rounded-md border border-gray-200 h-[20rem] bg-gray-900 p-5 hover:shadow-md transition duration-200 min-w-[250px] max-w-[300px] hover:border-[#d1b890] hover:scale-110 ">
                                        <div className="flex items-center justify-start flex-col w-full overflow-hidden h-full gap-5">
                                            <div className="w-1/4">
                                                <img
                                                    src={getImage(relic.image)}
                                                    alt={relic.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="w-full h-20 flex flex-col gap-2 whitespace-normal">
                                                <p className="text-xl font-semibold text-[#d1b890]">
                                                    {relic.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Bộ 2: {relic.set_two}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Bộ 4: {relic.set_four}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            {type === "lightcores" && lightcores?.filter(Boolean).map((lightcore, idx) => (
                                <Link
                                    key={lightcore.id || idx}
                                    href={route(
                                        "lightcore.detail",
                                        hashid.encode(lightcore.id)
                                    )}
                                    className="lightcore-link"
                                >
                                    <div className="lc-build">
                                        <img
                                            className=""
                                            src={getImage(lightcore.image)}
                                            alt={lightcore.name}
                                        />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="text-lg font-semibold mb-1 text-[#d1b890]">
                                            {lightcore.name}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        {type === "ornaments" &&
                            ornaments.map((ornament, idx) => (
                                <Link key={idx} href={route("ornament.detail",hashid.encode(ornament.id))}
                                className="block rounded-md border border-gray-200 bg-gray-900 h-[20rem] p-5 hover:shadow-md transition duration-200 min-w-[250px] max-w-[300px] hover:border-[#d1b890] ">
                                    <div className="flex items-center justify-start flex-col w-full overflow-hidden h-full gap-5">
                                        <div className="w-1/4">
                                            <img
                                                src={getImage(ornament.image)}
                                                alt={ornament.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="w-full h-20 flex flex-col gap-1 whitespace-normal ">
                                            <p className="text-xl font-semibold text-[#d1b890]">
                                                {ornament.name}
                                            </p>
                                            <p className="text-gray-500 ">
                                                Bộ 2: {ornament.set_two}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </motion.div>
                    </AnimatePresence>

                    {/* Nút phải */}
                    <button
                        onClick={() => scroll("right")}
                        className="hover:border-[#f29e38] border-gray-500 border cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#2d2f39] hover:bg-[#3d404e] rounded-full"
                    >
                        <ChevronRightIcon className="w-6 h-6 text-[#f29e38]" />
                    </button>
                </div>
            </>
        )
    }

    export default Build
