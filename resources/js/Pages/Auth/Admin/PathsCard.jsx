import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { getImage } from "../../../Utils/getImagePath"
import parse from 'html-react-parser'

function PathsCard({ data, idx }) {
  const [isOpen, setIsOpen] = useState(false)
  const [openChoose, setOpenChoose] = useState(false);
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
    <>
      <motion.div
        key={idx}
        ref={cardRef}
        className="layout-card btnFilter w-[24rem] h-[8rem] cursor-pointer rounded-[5px]"
        onClick={() => setOpenChoose(!openChoose)}
      >
        <img
          src={getImage(data.aeon_img)}
          className="bg_card opacity-80 translate-y-[8.5rem] scale-480"
          alt=""
        />
        <div className="relative flex h-full w-[80%] m-1 outline-none focus:outline-none ring-0 focus:ring-0">
          <div className='h-full flex justify-center flex-col items-center px-2 gap-2'>
            <div className="whitespace-nowrap text-[1rem] text-[#b7b195]">
              {parse(data.name)}
            </div>
            <img
              className="h-1/2 px-1"
              src={getImage(data.image)}
              alt=""
            />
          </div>
          <div className="flex mt-5 flex-col w-[50%] h-full gap-3">
            <p className="truncate text-[.9rem] text-[#797981]">
              Aeon: {data.aeon}
            </p>
            <p className="truncate text-[.9rem] text-[#797981]">
              Câu Chuyện: {parse(data.pathDesc)}
            </p>
            <p className="truncate text-[.9rem] text-[#797981]">
              Mô Tả: {parse(data.mechDesc)}
            </p>
          </div>
        </div>
        <AnimatePresence>
          {openChoose && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 no-hover w-full h-full flex justify-evenly items-center text-[#c3ac83] bg-black/20 backdrop-blur-sm z-50"
            >
              <p
                className="font-bold p-2 border rounded-2xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                Xem chi tiết
              </p>
              <p className="font-bold p-2 border rounded-2xl cursor-pointer">Chỉnh sửa</p>
              <p className="font-bold p-2 border rounded-2xl cursor-pointer">Xóa</p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center -translate-x-[15%]"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#1f1f1f] text-white rounded-xl p-6 w-[90%] max-w-[50rem] max-h-[90vh] overflow-y-auto popup"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">{parse(data.name)}</h2>
              <img src={getImage(data.image)} alt="" className="w-40 h-auto mx-auto mb-4" />
              <p className="text-sm text-gray-300 mb-2"><strong>Aeon:</strong> {data.aeon}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>Câu Chuyện:</strong> {parse(data.pathDesc)}</p>
              <p className="text-sm text-gray-300"><strong>Mô Tả:</strong> {parse(data.mechDesc)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PathsCard
