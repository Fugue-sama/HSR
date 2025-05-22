import "~css/relics.css"
import "~css/lightcoreDetail.css"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Hashids from "hashids"
import { Link } from "@inertiajs/react"
import { getImage } from "../../../../../Utils/getImagePath"
import ButtonBack from "../../../../../Components/C-Button/ButtonBack"
import { motion } from 'framer-motion'

function RelicDetail({ relic }) {
    const ref = useRef(null)
    const hashid = new Hashids("salt", 8)
    const types = JSON.parse(relic.type)

    const set = JSON.parse(relic.suit)
    const recommendedChars = relic.characters
    const isInView = useInView(ref, { margin: "0px", once: false })

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: "easeOut",
          },
        }),
      }
    return (
        <div className="layout-detail_container rl-detail_container relative pt-[2rem] flex flex-col w-full h-screen justify-start items-center overflow-auto gap-10">
            <ButtonBack />

            <div className="rl-img-desc-contain w-full md:w-[80%] h-fit relative flex justify-start gap-10">
                <div
                    ref={ref}
                    className="rl-img-contain relative m-2 w-[15%] h-fit"
                    animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                    transition={{  duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        className="pt-3 pl-3 w-full"
                        src={getImage(relic.image)}
                        alt={relic.name}
                    />
                </div>

                <div className="lc-desc p-1 w-fit">
                    <div className="lc-name text-3xl text-white">
                        <p>{relic.name}</p>
                    </div>
                    <div className="lc-quote py-5 text-[#cacaca] flex gap-5">
                        {types.map((type, idx) => (
                            <p
                                className=" p-[.3rem] bg-[#1c1c21] text-[#f29e38] rounded-tr-md hover:border hover:bg-[#ea973152] select-none"
                                key={idx}
                            >
                                {type}
                            </p>
                        ))}
                    </div>
                    <div className="rl-set py-5 h-[6rem] relative text-[#cacaca] flex gap-5">
                    {(relic.set_four ? [set.Head, set.Hands, set.Body, set.Feet] : [set.PS, set.LR]).map((item, index) => (
                        <motion.img
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        className="rl-suit h-full"
                        src={getImage(item)}
                        alt=""
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="rl-info-contain relative w-full mb-4 md:w-[80%] bg-[#292e34] p-5 rounded-2xl ">
                <div className="relative text-left h-6 text-2xl text-white font-bold">
                    Thông Tin Cơ Bản
                </div>
                <hr className="relative border-t-2 border-gray-50 my-4 " />
                <div className="rl-info-contain relative h-fit rounded-2xl">
                    <div className="rl-info flex flex-col gap-10 text-[1.2rem] text-[#757883]">
                        <div className="rl-name flex justify-start flex-col w-full gap-8">
                            <div className="flex items-start gap-2 mb-2 ">
                                <p className="min-w-[6rem] font-medium text-[#757883]">
                                    Tên
                                </p>
                                <p className="whitespace-pre-wrap text-[#f29e38]">
                                    {relic.name}
                                </p>
                            </div>
                        </div>
                        <div className="rl-effect flex justify-start flex-col w-full gap-8">
                            <div className="w-fit whitespace-normal ">
                                {relic?.set_four ? (
                                    <>
                                        <div className="flex items-start gap-2 mb-2">
                                            <p className="min-w-[6rem] font-medium text-[#757883]">
                                                Bộ 2
                                            </p>
                                            <p className="whitespace-pre-wrap text-[#f29e38]">
                                                {relic.set_two}
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <p className="min-w-[6rem] font-medium text-[#757883]">
                                                Bộ 4
                                            </p>
                                            <p className="whitespace-pre-wrap text-[#f29e38]">
                                                {relic.set_four}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-start gap-2 mb-2">
                                        <p className="min-w-[6rem] font-medium text-[#757883]">
                                            Bộ 2
                                        </p>
                                        <p className="whitespace-pre-wrap text-[#f29e38]">
                                            {relic.set_two}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lc-roll w-[80%] h-fit bg-[#292e34] rounded-2xl p-5 mb-5">
                <p className="relative text-left h-6 text-2xl text-white font-bold">
                    Thông Tin Thêm
                </p>
                <hr className="relative border-t-2 border-gray-50 my-4 " />
                <div className=" relative h-fit w-full">
                    <div className=" sspy-5 pr-2">
                        <div className=" w-fit bg-[#e5e5e5] p-2 truncate text-[.8rem] font-bold font-sans  flex items-center gap-2 text-black [border-radius:0_16px_0_0]">
                            <svg
                                width="11"
                                height="13"
                                viewBox="0 0 11 13"
                                fill="#000"
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5 9.321v3.48L.227 10.045V4.562l3.01 1.72A3.5 3.5 0 015 9.322zM3.733 5.414A4.498 4.498 0 015.5 7.26a4.498 4.498 0 011.767-1.846L10.3 3.682 6.708 1.608 1.914 4.375l1.819 1.04zM5.5.911l.208.12L.909 3.8l-.208-.12L5.5.912zm5 3.808l.274-.157v5.483l-.274.158V4.719zm-.833.476L7.764 6.282A3.5 3.5 0 006 9.322V12.8l3.667-2.117v-5.49z"
                                    fill="#000"
                                />
                            </svg>
                            <span>Nhân Vật Đề Xuất Sử Dụng</span>
                        </div>
                        {recommendedChars.length !== 0 ? (
                            recommendedChars.map((char) => (
                                <Link
                                    href={route(
                                        "character.detail",
                                        hashid.encode(char.id)
                                    )}
                                    key={char.id}
                                    className="recommended-char w-full relative h-[150px] flex flex-col justify-center items-center"
                                >
                                    <div
                                        className="relative w-[8%] rounded-tr-[12px] cursor-pointer h-[80%] flex flex-col justify-center items-center overflow-hidden"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, #3e404e, #88888e)",
                                        }}
                                    >
                                        <img
                                            className="absolute w-fit scale-[2] h-full top-10"
                                            src={getImage(char.image)}
                                            alt=""
                                        />
                                        <p className="text-white absolute -bottom-2 bg-gray-700 text-center w-full text-[1.2rem] py-1 ">
                                            {char.name}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="relative h-6 text-2xl text-white text-center opacity-50 font-bold">
                                Chưa có nhân vật đề xuất
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelicDetail
