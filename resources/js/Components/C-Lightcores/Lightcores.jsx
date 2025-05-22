import React, { useEffect, useRef, useState } from "react"
import { usePage } from "@inertiajs/react"
import "~css/lightcore.css"
import "~css/character.css"
import "~css/relics.css"


import LightcoresFilter from "./LightcoresFilter/LightcoresFilter"
import LightcoreCardAdmin from "../../Pages/Auth/Admin/Lightcores/LightcoreCard/LightcoreCard"
import LightcoreCardUser from "../../Pages/Auth/User/Lightcores/LightcoreCard/LightcoreCard"
import ButtonReset from "../../Utils/ButtonReset"
import ScrollToTopButton from "../../Utils/ScrollToTopButton"
import WikiLayout from "../../Layouts/WikiLayout"

function Lightcores({ lightcores, paths }) {
    const { auth } = usePage().props

    const containerRef = useRef(null)
    const filterRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [setOpen, setSetOpen] = useState(false)

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                setIsOpen(false)
                setSetOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
    }, [])
    return (
        <WikiLayout title="Lightcores">
            <div
                ref={containerRef}
                className="lightcores relative w-full h-screen overflow-x-hidden flex justify-center"
            >
                <div className="fit absolute w-full h-fit flex justify-center">
                    <div className="py-10 flex justify-start flex-col w-fit items-center h-full">
                        <LightcoresFilter
                            auth = {auth}
                            setOpen={setOpen}
                            setSetOpen={setSetOpen}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            filterRef={filterRef}
                            paths={paths}
                        />
                        <div className="characters-container relative w-[60%] px-10 h-fit">
                            <div className="Char-card-container py-10 relative flex gap-5 flex-wrap h-fit w-full">
                                {lightcores.length !== 0 ? (
                                   lightcores.map((lightcore) => {
                                    const path = paths.find(item => item.id == lightcore.path_id);
                                    const CardComponent = auth.user ? LightcoreCardAdmin : LightcoreCardUser;
                                    return (
                                        <CardComponent
                                            key={lightcore.id}
                                            lightcore={lightcore}
                                            path={path}
                                        />
                                    );
                                })
                                ) : (
                                    <div className="relative w-full flex justify-center flex-col items-center translate-y-20 translate-x-40 gap-10">
                                        <h1 className="text-4xl font-mono text-white opacity-20">
                                            Không tìm thấy
                                        </h1>
                                        <img
                                            className="opacity-20"
                                            src="/images/logo-web.webp"
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="btn-relics fixed bottom-1/3 right-10 flex flex-col gap-2">
                          <ButtonReset url={auth.user ? 'adm.lightcores' : 'lightcores.index'} />
                            <ScrollToTopButton containerRef={containerRef} />
                    </div>
                </div>
            </div>
        </WikiLayout>
    )
}

export default Lightcores
