import parse from 'html-react-parser'
import { Link, router } from "@inertiajs/react"
import Hashids from "hashids"
import { motion , AnimatePresence} from 'framer-motion'
import { getImage } from "../../../../../Utils/getImagePath"
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { route } from 'ziggy-js'

function RelicCard({ Relic }) {
    
    const suits = JSON.parse(Relic.suit)
    if (!Relic) return
    const hashid = new Hashids('salt', 8)
    
    const [openChoose, setOpenChoose] = useState(false)
    const cardRef = useRef(null)
        useEffect(()=> {
          const handleClickOutSide = (e)=> {
            if (!cardRef.current?.contains(e.target)) {
              setOpenChoose(false)
            }
          }
          document.addEventListener('mousedown', handleClickOutSide)
          return ()=> document.removeEventListener('mousedown', handleClickOutSide)
        }, [])
    const handleDelete = () => {
        const routeName = Relic.set_four
            ? 'adm.relics.destroy'
            : 'adm.ornament.destroy'
    
        const encodedId = hashid.encode(Relic.id)
    
        router.visit(route(routeName, encodedId), {
            method: 'delete',
            onStart: () => {
                toast.loading('Đang xóa...')
            },
            onSuccess: () => {
                toast.dismiss()
                toast.success('Xóa thành công!')
            },
            onError: () => {
                toast.dismiss()
                toast.error('Xóa thất bại!')
            },
        })
    }
    return (
        <div 
            className="outline-none focus:outline-none ring-0 focus:ring-0" >
            <motion.div
                key={Relic.image}
                initial={{ opacity: 0.5, y: 10, scale: 0.9}}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.5 }}
                className="relic-card cursor-pointer"  ref={cardRef} onClick={() => setOpenChoose(!openChoose)}
                
            >
                <img
                        src="../../images/artifactCardBg.png"
                        className="relic-bg_card"
                        alt=""
                    />
                    <div className="relic-card-title relative flex h-[7rem] m-1">
                        <div className="card-main">
                            <img src={getImage(Relic.image)} alt="" />
                        </div>
                        <div className="card-left flex flex-col gap-2 w-[65%] left-[7rem] ">
                            <div className="card-name whitespace-nowrap h-[1.2rem] text-[1rem] text-[#b7b195]">
                                {Relic.name}
                            </div>
                            <div className="card-other text-[#7f838c] h-[1rem] text-[.8rem]">
                                Bộ
                            </div>
                            <div className="card-suit relative flex h-[2.8rem] gap-2">
                                {Object.values(suits).map((value, index) => (
                                    <div key={value} className="card-suit_item w-[20%]">
                                        <img
                                            className=" h-full "
                                            src={getImage(value)}
                                            alt='suit'
                                        />
                                    </div>
                                ))}
                        </div>
                        </div>
                    </div>
                    <div className="card-line"></div>
                    <div className="card-descs relative flex flex-col h-[3rem] gap-[.5rem]">
                        {Object.values(suits).length == 2 ? 
                            <div className="desc-item relative h-fit w-full flex items-center justify-evenly top-2 gap-3 ">
                                <div className="item-num">{Object.values(suits).length}</div>
                                <div className="item-detail whitespace-normal line-clamp-2 ">
                                {Relic.set_two}
                                </div>
                            </div>
                        :
                        (<>
                            <div className="desc-item relative h-fit w-full flex items-center justify-start gap-3">
                                <div className="item-num">2</div>
                                <div className="item-detail whitespace-nowrap ">
                                    {parse(Relic.set_two)}
                                </div>
                            </div>
                            <div className="desc-item relative h-fit w-full flex items-center justify-start gap-3">
                                <div className="item-num">4</div>
                                <div className="item-detail whitespace-nowrap ">
                                    {parse(Relic.set_four)}
                                </div>
                            </div>
                        </>)
                            
                        }
                    </div>
                    <AnimatePresence>
                        {openChoose && (
                        <motion.div 
                        key={openChoose}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 w-full h-full flex justify-evenly items-center text-[#c3ac83] bg-black/50 backdrop-blur-sm z-50"
                        >
                        <Link href={Relic.set_four ? route('relic.detail', hashid.encode(Relic.id)): route('ornament.detail', hashid.encode(Relic.id))}
                            title="Giao diện người dùng"
                            className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
                        >
                            Xem chi tiết
                        </Link>
                        <Link href={Relic.set_four ? route('adm.relics.edit', hashid.encode(Relic.id)): route('adm.ornament.edit', hashid.encode(Relic.id))}
                        title="Chỉnh sửa" className="cursor-pointer hover:underline font-bold p-2 rounded-2xl">
                            Chỉnh sửa
                        </Link>
                        <button
                            onClick={handleDelete}
                            title="Xóa"
                            className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
                        >
                            Xóa
                        </button>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
    )
}

export default RelicCard
