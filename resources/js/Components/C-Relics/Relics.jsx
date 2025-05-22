import React, { useEffect, useRef, useState } from "react"
import "~css/relics.css"
import RelicCardUser from "../../Pages/Auth/User/Relics/Relic/RelicCard"
import RelicCardAdmin from "../../Pages/Auth/Admin/Relics/Relic/RelicCard" 
import ScrollToTopButton from "../../Utils/ScrollToTopButton"
import { router, usePage } from "@inertiajs/react"
import { SaveCookie } from "../../Utils/Cookie/SaveCookie"
import Type from "./Type/Type"
import Set from "./Set/Set"
import ButtonReset from "../../Utils/ButtonReset"
import WikiLayout from "../../Layouts/WikiLayout"
import { route } from "ziggy-js"

function Relics({ Relics }) {
    const { auth, url } = usePage().props
    const [isOpen, setIsOpen] = useState(false)
    const [checkedItems, setCheckedItems] = useState({})
    const [countOption, setCountOption] = useState(0)
    const [setOpen, setSetOpen] = useState(false)
    const [setCheckeds, setSetCheckeds] = useState({})
    const [countSet, setCountSet] = useState(0)
    const [isRedirect, setIsRedirect] = useState(false)

    const containerRef = useRef(null)
    const filterRef = useRef(null)

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (url === "/relics/filter" && !isRedirect) {
                setIsRedirect(true)
                router.visit("/relics", { replace: true })
            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [url, isRedirect])

    useEffect(() => {
        if (!isOpen) setCheckedItems({})
        if (!setOpen) setSetCheckeds({})
    }, [isOpen, setOpen])

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (!filterRef.current.contains(event.target)) {
                setIsOpen(false)
                setSetOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => document.removeEventListener("mousedown", handleClickOutSide)
    }, [])

    const handleAccept = () => {
        const relics = Object.keys(checkedItems)
        const ornaments = Object.keys(setCheckeds)

        router.get(route(auth.user ? 'adm.relics.filter' : 'relics.filter'), { relics, ornaments }, {
            preserveState: true,
            replace: false
        })
        SaveCookie(relics, 'filterHis_relics')
        setIsOpen(false)
        setSetOpen(false)
        setCountOption(0)
        setCountSet(0)
        setCheckedItems({})
        setSetCheckeds({})
    }

    return (
        <WikiLayout title='Relics'>
            <div ref={containerRef} className="relics relative w-full h-screen overflow-auto flex justify-center">
                <div className="absolute w-full flex justify-center">
                    <div className="py-10 flex justify-start flex-col w-[60%] items-center h-full">
                        <div ref={filterRef} className="filter flex justify-evenly w-full z-20">
                            <Type isOpen={isOpen} setIsOpen={setIsOpen} checkedItems={checkedItems} setCheckedItems={setCheckedItems} countOption={countOption} setCountOption={setCountOption} handleAccept={handleAccept} />
                            <Set setOpen={setOpen} setSetOpen={setSetOpen} setCheckeds={setCheckeds} setSetCheckeds={setSetCheckeds} countSet={countSet} setCountSet={setCountSet} handleAccept={handleAccept} />
                        </div>
                        <div className="relics-container h-screen">
                            {Relics.length ? (
                                Relics.map((Relic) => {
                                    const CardComponent = auth.user ? RelicCardAdmin : RelicCardUser
                                    return <CardComponent key={Relic.name} Relic={Relic} />
                                })
                            ) : (
                                <div className='relative w-full flex justify-center flex-col items-center gap-10'>
                                    <h1 className='text-4xl font-mono text-white opacity-20'>Không tìm thấy</h1>
                                    <img className='opacity-20' src='/images/logo-web.webp' alt="" />
                                </div>
                            )}
                        </div>
                        <div className="btn-relics fixed bottom-1/2 right-10 flex flex-col gap-2">
                            <ButtonReset url={auth.user ? 'adm.relics' : 'relics.index'} />
                            <ScrollToTopButton containerRef={containerRef} />
                        </div>
                    </div>
                </div>
            </div>
        </WikiLayout>
    )
}

export default Relics
