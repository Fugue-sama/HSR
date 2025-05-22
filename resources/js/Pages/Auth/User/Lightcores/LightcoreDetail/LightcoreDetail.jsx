import React, { useState } from "react"
import "~css/lightcore.css"
import "~css/lightcoreDetail.css"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import parse from "html-react-parser"
import Hashids from "hashids"
import { Link } from "@inertiajs/react"
import { getImage, getImgPublic } from "../../../../../Utils/getImagePath"
import ButtonBack from "../../../../../Components/C-Button/ButtonBack"

function LightcoreDetail({ lightcore }) {
    const fixedRoll = lightcore.roll.replace(/^"|"$/g, '');

    const hashid = new Hashids('salt', 8)
    const ref = useRef(null)
    const [level, setLevel] = useState(1)
    const incrementHP = 15.5
    const incrementAttack = 6.3
    const incrementDP = 4.7
    const calcStat = (base, increment) => Math.round(base + (level - 1) * increment)
    const recommendedChars = lightcore.characters
    const isInView = useInView(ref, { margin: "0px", once: false })
    const lightcoreRoll = fixedRoll
    const statsBase = {
        hp: lightcore.hp,
        attack: lightcore.attack,
        defense: lightcore.defend,
    }
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(lightcore.desc || "")
    return (
        <div className="layout-detail_container lightcore-detail_container relative pt-[2rem] flex flex-col w-full h-screen justify-start items-center overflow-auto gap-10">
            <ButtonBack />
            <div className="lc-img-desc-contain w-full md:w-[80%] h-fit relative flex justify-start gap-10">
                <motion.div
                    ref={ref}
                    className="lc-img-contain relative m-2 w-[15%] h-fit rotate-5"
                    animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        className="pt-3 pl-3 w-full"
                        src={getImage(lightcore.image)}
                        alt={lightcore.name}
                    />
                </motion.div>

                <div className="lc-desc p-5 w-fit">
                    <div className="lc-name text-3xl text-white">
                        <p>{lightcore.name}</p>
                    </div>
                    <div className="lc-quote py-5 text-[#cacaca]">
                        {isHtml ? parse(lightcore.desc) : <p style={{ whiteSpace: 'pre-line' }}>{lightcore.desc}</p>}
                    </div>
                </div>
            </div>
            <div className="lc"></div>
            <div className="lightcore-info-contain relative w-full mb-4 md:w-[80%] bg-[#292e34] p-5 rounded-2xl ">
                <div className="relative text-left h-6 text-2xl text-white font-bold">
                    Thông Tin Cơ Bản
                </div>
                <hr className="relative border-t-2 border-gray-50 my-4 " />
                <div className="lc-info-contain relative h-fit rounded-2xl">
                    <div className="lc-info flex flex-col gap-10 text-[1.2rem]">
                        <div className="lc-name flex justify-start flex-col w-full gap-8">
                            <div className="label whitespace-normal w-[25%] text-[#ffffff40] font-bold">
                                Tên
                            </div>
                            <p className="w-fit whitespace-normal text-white">
                                {lightcore?.name || "Chưa có tên"}
                            </p>
                        </div>
                        <div className="lc-effect flex justify-start flex-col w-full gap-8">
                            <div className="label whitespace-normal w-full text-[#ffffff40] font-bold">
                                {lightcore?.subtile ? 'Lời Tựa: ' + lightcore.subtile : "Chưa có lời tựa"}
                            </div>
                            <p className="w-fit whitespace-normal text-white">
                                {parse(lightcore?.effect || "")}
                            </p>
                        </div>
                        <div className="lc-path flex justify-center flex-col w-full h-fit gap-8">
                            <div className="label whitespace-normal w-full text-[#ffffff40] font-bold ">
                                Vận Mệnh
                                <p className="text-white py-2 text-center">
                                    {lightcore?.path?.name ||
                                        "Không có tên vận mệnh"}
                                </p>
                            </div>
                            <div className="h-fit flex justify-center">
                                <img
                                    className="h-full w-[10%] "
                                    src={getImage(lightcore?.path?.image)}
                                    alt={
                                        lightcore?.path?.name || "Không có hình"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lc-image_full w-[80%] h-fit bg-[#292e34] rounded-2xl p-5">
                <p className="relative text-left h-6 text-2xl text-white font-bold">
                    Ảnh
                </p>
                <hr className="relative border-t-2 border-gray-50 my-4 " />
                <div className="lc-image-show relative h-fit w-full flex justify-center flex-col items-center">
                    <div className="lc-image_name py-5 pr-2  w-full">
                        <p className=" w-fit bg-[#e5e5e5] p-2 truncate text-[.8rem] font-bold font-sans flex items-center gap-2 text-black [border-radius:0_16px_0_0]">
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
                            <span>{lightcore.name}</span>
                        </p>
                    </div>
                    <div className="lc-image_img relative w-1/4">
                        <img
                            className="h-1/4 "
                            src={getImage(lightcore.image)}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className="lc-level w-[80%] bg-[#292e34] rounded-2xl p-5 mb-5">
                <div className="text-left text-2xl text-white font-bold mb-4">
                    Chỉ Số Nâng Bậc
                </div>
                <hr className="border-t-2 border-gray-50 mb-6" />

                <div className="flex flex-col gap-4">
                    {/* Thanh cấp độ */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="w-fit bg-[#e5e5e5] px-5 py-2 text-sm font-bold font-sans text-black rounded-tr-2xl flex items-center gap-2">
                            <svg
                                width="11"
                                height="13"
                                viewBox="0 0 11 13"
                                fill="#000"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5 9.321v3.48L.227 10.045V4.562l3.01 1.72A3.5 3.5 0 015 9.322zM3.733 5.414A4.498 4.498 0 015.5 7.26a4.498 4.498 0 011.767-1.846L10.3 3.682 6.708 1.608 1.914 4.375l1.819 1.04zM5.5.911l.208.12L.909 3.8l-.208-.12L5.5.912zm5 3.808l.274-.157v5.483l-.274.158V4.719zm-.833.476L7.764 6.282A3.5 3.5 0 006 9.322V12.8l3.667-2.117v-5.49z"
                                    fill="#000"
                                />
                            </svg>
                            <label className="text-black text-base font-medium">
                            Cấp:{" "}
                            <span className="font-bold text-[#1100ff]">
                                {level}
                            </span>
                        </label>
                        </p>

                        <input
                            type="range"
                            min={1}
                            max={80}
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                            className="w-full accent-[#00ffff] md:max-w-[300px] h-1"
                        />
                    </div>

                    {/* Thống kê chỉ số */}
                    <div className="lc-stats bg-[#1e2227] p-4 rounded-xl shadow-inner text-white">
                        <div className="stats-container grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="text-gray-400 font-semibold">
                                    HP
                                </div>
                                <div className="text-gray-400 font-semibold">
                                    Tấn Công
                                </div>
                                <div className="text-gray-400 font-semibold">
                                    Phòng Ngự
                                </div>
                            </div>
                            <div className="space-y-3 font-bold text-[#00ffff]">
                                <div>{calcStat(statsBase.hp, incrementHP)}</div>
                                <div>
                                    {calcStat(
                                        statsBase.attack,
                                        incrementAttack
                                    )}
                                </div>
                                <div>
                                    {calcStat(statsBase.defense, incrementDP)}
                                </div>
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
                <div className="lc-roll relative h-fit w-full">
                    <div className="roll-ticket py-5 pr-2">
                        <p className=" w-fit bg-[#e5e5e5] p-2 truncate text-[.8rem] font-bold font-sans flex items-center gap-2 text-black [border-radius:0_16px_0_0]">
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
                            <span>Cách Nhận</span>
                        </p>
                    </div>
                    <div className="lc-image_img relative w-full h-full flex flex-col justify-center items-center">
                        <p className="text-white text-[1.2rem]">
                            {lightcoreRoll == "limit"
                                ? "Vòng Quay Giới Hạn"
                                : "Vòng Quay Vĩnh Viễn"}
                        </p>
                        <div className="relative group inline-block cursor-pointer">
                            <img
                                className="h-[50%]"
                                src={getImgPublic(
                                    `card-list/${
                                        lightcoreRoll == "limit"
                                            ? "limit"
                                            : "regular"
                                    }.webp`
                                )}
                                alt=""
                            />
                            <div className="absolute bottom-full mb-10 left-1/2 hidden -translate-x-1/2 truncate w-max rounded bg-gray-800 px-2 py-1 text-sm text-white group-hover:block z-10 ">
                                {lightcoreRoll === "limit"
                                    ? "Vé Tinh Cầu Đặc Biệt .... Có những người bạn đã lâu không gặp? Hãy lên tàu và đi du lịch cùng anh ấy/cô ấy nhé!"
                                    : "Vé Tinh Cầu .... Đi bất cứ nơi nào bạn muốn, gặp những người bạn muốn, để lại những kỷ niệm khó quên."}
                            </div>
                        </div>
                    </div>

                    <div className="roll-ticket py-5 pr-2">
                        <p className=" w-fit bg-[#e5e5e5] p-2 truncate text-[.8rem] font-bold font-sans  flex items-center gap-2 text-black [border-radius:0_16px_0_0]">
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
                        </p>
                        {recommendedChars.length !== 0 ? 
                            recommendedChars.map((char) => (
                                <Link href={route('character.detail', hashid.encode(char.id))}
                                    key={char.id}
                                    className="recommended-char w-full relative h-[150px] flex flex-col justify-center items-center"
                                >
                                    <div className="relative w-[8%] rounded-tr-[12px] cursor-pointer h-[80%] flex flex-col justify-center items-center overflow-hidden"
                                        style={{ background: 'linear-gradient(180deg, #3e404e, #88888e)' }}    >
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
                            :
                         (
                            <p className="relative h-6 text-2xl text-white text-center opacity-50 font-bold">Chưa có nhân vật đề xuất</p>
                         )
                         }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LightcoreDetail
