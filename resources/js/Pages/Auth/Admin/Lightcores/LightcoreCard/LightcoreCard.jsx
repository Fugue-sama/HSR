import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import parse from 'html-react-parser'
import Hashids from 'hashids'
import { getImage, getImageWiki, getImgPublic } from '../../../../../Utils/getImagePath'
import ImageWithFallback from '../../../../../Components/ImageWithFallback'

function LightcoreCard({lightcore, path}) {
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

  return (
    <motion.div 
    key={lightcore.id} 
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ amount: 0.3 }}
    className="lightcore-card btnFilter" ref={cardRef} onClick={() => setOpenChoose(!openChoose)}>
       <ImageWithFallback
            src={getImage(path.image)}
            fallbackSrc={getImgPublic('logo-web.webp')}
            alt=""
            className="lightcore-bg_card opacity-20"
        />
        <div className="lightcore-card-title relative flex m-1" >
            <div className={`card-main`}>
                <img className='absolute h-full pt-2 pl-1' src={getImage(lightcore.image)} alt="" />
            </div>

            <div className="lightcore-card-left flex flex-col w-[65%] left-[7.5rem] ">
                <div className="lightcore-card-name whitespace-nowrap mt-1 h-[1.6rem] text-[1rem] text-[#b7b195]">
                    {lightcore.name}
                </div>
                <div className="lightcore-card-path my-[0.5px] ">
                  <div className="path-info w-full flex justify-start items-center text-[#919d9b]">
                    <img className='relative w-[10%] h-full' src={getImage(path.image)} alt={path.name} />
                    <span className='mx-2'>{path.name}</span>
                  </div>
                </div>
                <div className="rarity-element flex justify-start items-center gap-2">
                  <div className="lightcore-rarity">
                        {Array(lightcore.rarity)
                          .fill(0)
                          .map((_, i) => (
                            <img
                                key={i}
                                src={getImageWiki('level_star.png')}
                                alt=""
                                className="h-3 w-3 inline"
                            />
                        ))}
                  </div>
                </div>
                <div className="stats-lightcore flex h-[1.2rem] justify-between pr-2 gap-5 text-[#606667]">
                  <div className="stat-lightcore flex h-full w-[5rem] justify-between items-center bg-[#1e1e1e] p-1">
                      <img className='h-full' src={getImgPublic('card-list/hp.png')} alt="hp" />
                      <span className='text-[.8rem]'>{lightcore.hp}</span>
                  </div>
                  <div className="stat-lightcore flex h-full w-[5rem] justify-between items-center bg-[#1e1e1e] p-1">
                      <img className='h-full' src={getImgPublic('card-list/attack.png')} alt="hp" />
                      <span className='text-[.8rem]'>{lightcore.attack}</span>
                  </div>
                  <div className="stat-lightcore flex h-full w-[5rem] justify-between items-center bg-[#1e1e1e] p-1">
                      <img className='h-full' src={getImgPublic('card-list/defense.png')} alt="hp" />
                      <span className='text-[.8rem]'>{lightcore.defend}</span>
                  </div>
                </div>
                <div className="card-line bg-[#959a9c] h-[1px] mt-2 opacity-30 w-full">
                  <div className="lightcore-decs truncate text-[#FFFFFF] pt-1 text-[.8rem] font-stretch-ultra-expanded">
                    <p>{lightcore.subtile}</p>
                    <p>{parse(lightcore.effect)}</p>
                  </div>
                </div>
            </div>
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
            <Link
              title="Giao diện người dùng"
              href={route('lightcore.detail', hashid.encode(lightcore.id))}
              className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
            >
              Xem chi tiết
            </Link>
            <Link href ={route('adm.lightcores.edit',hashid.encode(lightcore.id))}
             title="Chỉnh sửa" className="cursor-pointer hover:underline font-bold p-2 rounded-2xl">
              Chỉnh sửa
            </Link>
            <button
              title="Xóa"
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn xóa này không?')) {
                  router.delete(route('adm.lightcores.destroy', hashid.encode(lightcore.id)))
                }
              }}
              className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
            >
              Xóa
            </button>
          </motion.div>
          )}
        </AnimatePresence>
      
    </motion.div>
  )
}

export default LightcoreCard