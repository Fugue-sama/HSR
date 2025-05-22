import { Head, usePage } from "@inertiajs/react"
import React from "react"
import "~css/detail.css"
import "~css/lightcore.css"
import Chart from "./Chart"
import Info from "./Info/Info"
import { getImage, getImageWiki } from "../../../../../../Utils/getImagePath"
import ButtonBack from "../../../../../../Components/C-Button/ButtonBack"
import CommentForm from "./Comments/CommentForm"
import CommentsContainer from "./Comments/CommentsContainer"

function Detail({ character }) {
    const { auth } = usePage().props

    const bg =
        character.rarity == 4
            ? "linear-gradient(180deg, #3f4064, #9c65d7)"
            : "linear-gradient(180deg, #a35d55, #d0aa6e)"

    const stats =
        typeof character.stats === "string"
            ? JSON.parse(character.stats)
            : character.stats
    const stats_data = [
        { name: "HP", value: stats.hp },
        { name: "Tấn Công", value: stats.attack },
        { name: "Phòng Thủ", value: stats.defend },
        { name: "Tốc Độ", value: stats.speed },
        { name: "Khiêu Khích", value: stats.taunt },
    ]
    return (
        <>
            <Head title="Detail" />

            <div className="detail-container">
                <div className="pt-5">
                    <ButtonBack />
                </div>
                <div className="poster selected-none">
                    <img
                        loading="lazy"
                        src={getImage(character.background)}
                        alt="character.name"
                    />
                </div>
                <div className="char-attributes ">
                    <div className="attributes top-[80px] right-10">
                        <div
                            className={`char-card relative flex flex-col justify-center h-[17.5rem] w-[12.5rem] rounded-[10px]`}
                            style={{ background: bg }}
                        >
                            <div className={`img w-full h-full relative`}>
                                <img
                                    loading="lazy"
                                    className={`top-0 absolute w-full h-full object-cover `}
                                    src={getImage(character.image)}
                                    alt={character.name}
                                />
                            </div>
                        </div>
                        <div className="char-name">{character.name}</div>
                        <div className="char-rarity max-w-[10rem]">
                            <img
                                loading="lazy"
                                src={getImageWiki(
                                    `rarity_${character.rarity}.png`
                                )}
                                alt="character.name"
                            />
                        </div>

                        <div className="char-path-element-container mt-3">
                            <div className="char-path-element flex justify-between gap-10 h-[6rem] w-full p-1">
                                <div className="item-element">
                                    <img
                                        loading="lazy"
                                        className="w-full h-full"
                                        src={getImage(
                                            `${character.element.image_id}`
                                        )}
                                        alt={character.element.name}
                                    />
                                </div>
                                <div className="item-path">
                                    <img
                                        loading="lazy"
                                        className="w-full h-full"
                                        src={getImage(
                                            `${character.path.image}`
                                        )}
                                        alt={character.path.name}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="char-container">
                            <Chart stats_data={stats_data} />
                        </div>
                    </div>
                </div>

                <div className="char-info_detail ">
                    <Info character={character} />
                </div>

                <div className="char-comments relative mt-20 w-full  flex justify-center p-10">
                    <div className="w-[60%] bg-[rgba(30,35,50,0.8)] border border-white/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
                        <h2 className="text-xl font-bold mb-4 text-[#dec599] underline">
                            Bình luận
                        </h2>

                        {!usePage().props.auth.user && (
                            <div className="mb-4 text-sm text-white/80 flex items-center gap-2">
                                <span>Bạn cần</span>
                                <a
                                    href="/login"
                                    className="text-[#dec599] hover:underline hover:text-[#e9d6a9] transition"
                                >
                                    đăng nhập
                                </a>
                                <span>để bình luận.</span>
                            </div>
                        )}

                        {auth.user && auth.user?.is_blocked == 0  && (
                            <CommentForm 
                            key="main-comment-form"
                            characterId={character.id} parentId={null}/>
                        )}
                        {auth.user?.is_blocked == 1 && (
                            <p className="text-sm text-red-400 mt-2">
                                Tài khoản của bạn đã bị chặn và không thể bình luận.
                            </p>
                        )}
                        <CommentsContainer auth={auth} character={character} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail
