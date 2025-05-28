import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CharacterButton from '../../../../../../../Components/C-Button/CharacterButton'
import { getImage } from  "~utils/getImagePath"
import { getImgPublic } from '../../../../../../../Utils/getImagePath'

function Souls({ pathID, souls }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [imgSrc, setImgSrc] = useState(getImage(souls[0].image))
  
  const fallbackImage = getImgPublic('logo-web.webp')

  const path_line = ['destruction_wiv5vh', 'hunt_znafvz', 'erudition_ynmee7', 'harmony_kvcpz1', 'nihility_tc4cz3', 'preservation_ywtbrn', 'abundance_zgxpc8', 'memory_vcdrqg']
  const path = path_line[pathID - 1]

  const handleNext = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % souls.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + souls.length) % souls.length)
  }

  // Cập nhật ảnh mỗi khi index thay đổi
  useEffect(() => {
    setImgSrc(getImage(souls[index].image))
  }, [index, souls])

  return (
    <div className="soul-content relative w-full h-full flex justify-center items-center">
      <img src="../../images/bgpath.png" loading='lazy' className='opacity-50 absolute w-full h-full select-none' alt="" />
      <img src={getImage(path)} loading='lazy' className='absolute object-contain w-full h-full select-none opacity-30' alt="" />

      <div className="soul-container relative left-10 flex justify-between items-center z-30 w-[90%]">
        <div className="desc w-[50%] text-white h-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={souls[index].name}
              initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="soul-card bg-[#050A2780] w-[25rem] rounded-3xl flex flex-col p-4 whitespace-normal"
            >
              <div className="soul-name my-1.5 text-2xl font-bold">
                <span className='text-amber-200'>{`[E${index + 1}] `}</span>{souls[index].name}
              </div>
              <div className="soul-desc wh my-1.5 text-[hsla(0,0%,100%,.85)]">{souls[index].desc}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-[40%] relative right-20 p-10 h-full flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              loading='lazy'
              key={imgSrc}
              src={imgSrc}
              alt="soul"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-h-[500px] object-contain"
              onError={() => setImgSrc(fallbackImage)}
            />
          </AnimatePresence>
        </div>
      </div>

      <CharacterButton handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

export default Souls
