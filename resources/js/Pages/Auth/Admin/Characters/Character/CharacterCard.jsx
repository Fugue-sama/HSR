import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import Hashids from 'hashids'
import { getImage, getImageWiki } from '../../../../../Utils/getImagePath'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CharacterCard({ character, path, element }) {
  const hashid = new Hashids('salt', 8)
  const [openChoose, setOpenChoose] = useState(false)
  const [notifi, setNotifi] = useState(false)
  const [loading, setLoading] = useState(false)

  const [loadedImages, setLoadedImages] = useState({
    background: false,
    character: false,
    path: false,
    element: false,
  })

  // Trạng thái đếm ảnh star đã load
  const [loadedStarsCount, setLoadedStarsCount] = useState(0)

  // Hàm đánh dấu ảnh chính đã load xong
  const markImageLoaded = (key) =>
    setLoadedImages((prev) => ({ ...prev, [key]: true }))

  // Hàm gọi khi 1 ảnh star load xong
  const markStarLoaded = () => {
    setLoadedStarsCount((count) => count + 1)
  }

  // Kiểm tra xem tất cả ảnh chính đã load xong chưa
  const allMainImagesLoaded = Object.values(loadedImages).every(Boolean)

  // Kiểm tra xem tất cả ảnh star đã load xong chưa
  const allStarsLoaded = loadedStarsCount === character.rarity

  // Kết luận: đợi tất cả ảnh chính + ảnh star load xong
  const allImagesLoaded = allMainImagesLoaded && allStarsLoaded

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa này không?')) return
    setLoading(true)
    try {
      await router.delete(route('characters.destroy', hashid.encode(character.id)), {
        onSuccess: () => {
          toast.success('Xóa thành công!')
          setLoading(false)
        },
        onError: () => {
          toast.error('Xóa thất bại, vui lòng thử lại.')
          setLoading(false)
        },
      })
    } catch (error) {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <>
      <div className="relative">
        {!allImagesLoaded && (
          <div className="absolute inset-0 bg-[#1f1f1f]/70 z-50 flex items-center justify-center rounded-lg animate-pulse">
            <span className="text-[#c3ac83] text-sm">Đang tải nội dung...</span>
          </div>
        )}
        <motion.div
          key={character.id}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.8 }}
          className="character-card btnFilter"
          onClick={() => setOpenChoose(!openChoose)}
          style={{ pointerEvents: allImagesLoaded ? 'auto' : 'none' }} // disable click khi chưa load xong
        >
          <img
            onLoad={() => markImageLoaded('background')}
            onError={() => markImageLoaded('background')}
            src={getImage(path.image)}
            className="char-bg_card opacity-20"
            alt=""
          />
          <div className="char-card-title relative flex h-[8rem] m-1 outline-none focus:outline-none ring-0 focus:ring-0">
            <div
              className={`card-main ${
                character.rarity == 5
                  ? 'bg-gradient-to-t from-[#a35d55] to-[#d0aa6e]'
                  : 'bg-gradient-to-b from-[#3f4064] to-[#9c65d7]'
              }`}
            >
              <img
                onLoad={() => markImageLoaded('character')}
                onError={() => markImageLoaded('character')}
                className="scale-[1.8] translate-y-[20px]"
                src={getImage(character.image)}
                alt=""
              />
            </div>

            <div className="char-card-left flex flex-col w-[65%] left-[7.5rem] gap-1 ">
              <div className="char-card-name whitespace-nowrap h-[1.4rem] text-[1.2rem] text-[#b7b195]">{character.name}</div>
              <div className="char-card-path my-1 ">
                <div className="path-info w-full flex justify-start items-center text-[#919d9b]">
                  <img
                    onLoad={() => markImageLoaded('path')}
                    onError={() => markImageLoaded('path')}
                    className="relative w-[15%] h-full"
                    src={getImage(path.image)}
                    alt={path.name}
                  />
                  <span className="mx-2">{path.name}</span>
                </div>
              </div>

              <div className="rarity-element flex justify-start items-center gap-2">
                <div className="char-rarity">
                  {Array(character.rarity)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={getImageWiki('level_star.png')}
                        alt=""
                        className="h-3 w-3 inline"
                        onLoad={markStarLoaded}
                        onError={markStarLoaded}
                      />
                    ))}
                </div>
                <div className="char-element px-1">
                  <img
                    onLoad={() => markImageLoaded('element')}
                    onError={() => markImageLoaded('element')}
                    className="h-6 w-6 inline"
                    src={getImage(element.image_id)}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {openChoose && (
              <motion.div
                key="choose-popup"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 w-full h-full flex justify-evenly items-center text-[#c3ac83] bg-black/50 backdrop-blur-sm z-50"
              >
                <Link
                  title="Giao diện người dùng"
                  href={route('adm.characters.show', hashid.encode(character.id))}
                  className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
                >
                  Xem chi tiết
                </Link>
                <div
                  onClick={() => setNotifi(true)}
                  title="Chỉnh sửa"
                  className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
                >
                  Chỉnh sửa
                </div>
                <button
                  title="Xóa"
                  onClick={handleDelete}
                  className="cursor-pointer hover:underline font-bold p-2 rounded-2xl"
                >
                  Xóa
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thông báo chức năng chưa hoàn thiện */}
          <AnimatePresence>
            {notifi && (
              <motion.div
                key="edit-warning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 w-full h-full bg-[#2d2d2d] text-[#c3ac83] px-6 py-3 text-center shadow-lg border border-[#c3ac83]"
              >
                <div className="text-sm flex items-center flex-col justify-center gap-2 w-full h-full font-bold">
                  <p>
                    Hiện tại chức năng <strong>chỉnh sửa</strong> chưa hoàn thiện.
                  </p>
                  <button onClick={() => setNotifi(false)} className="ml-4 text-[#c3ac83] underline">
                    Đóng
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Overlay loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black flex justify-center items-center text-white text-xl font-bold"
            >
              Đang xử lý...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast container */}
        <ToastContainer position="top-right" />
      </div>
    </>
  )
}

export default CharacterCard
