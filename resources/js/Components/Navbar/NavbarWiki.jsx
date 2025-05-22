import { Link, usePage } from "@inertiajs/react"
import React, { useState } from "react"
import "~css/navbar-wiki.css"
import { getImageWiki } from "../../Utils/getImagePath"
import { motion, AnimatePresence } from "framer-motion"
import LogInOut from "./LogInOut"
import RecentPanel from "../Recent-history/RecentPanel"
import { ReadCookie } from "../../Utils/Cookie/ReadCookie"

function NavbarWiki({ navigation }) {
    const { url: currentUrl } = usePage()
    const pageUrl = currentUrl.includes("adm")
        ? currentUrl.split("/")[2]
        : currentUrl.split("/")[1]
    const [showAddModal, setShowAddModal] = useState(false)

    const [isSelectOpen, setIsSelectOpen] = useState(false)
    
    const rawHistory = ReadCookie(`filterHis_${pageUrl}`)
    const filterHistory = Array.isArray(rawHistory) ? rawHistory : []

    const [isOpen, setIsOpen] = useState(false)
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const handleToggleMenuHide = () => {
        setIsMenuClicked(true)

        setTimeout(() => {
            setIsOpen((prev) => !prev)
        }, 300)
    }
    const handleToggleMenuShow = () => {
        setIsOpen(false)

        setTimeout(() => {
            setIsMenuClicked((prev) => !prev)
        }, 100)
    }

    return (
        <>
            {!isMenuClicked && (
                <motion.div
                    key="nav-wiki"
                    initial={{ x: -200, opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0.5 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        bounce: 0.2,
                        duration: 0.5,
                    }}
                    className={`fixed top-1/3 left-0 w-fit h-fit bg-[#282828] rounded-r-2xl overflow-hidden z-50 hover:shadow-[0_2px_4px_#262b31] cursor-pointer`}
                    onClick={handleToggleMenuHide}
                >
                    <img
                        className="w-[4.5rem]"
                        src={getImageWiki("menu.png")}
                        alt=""
                    />
                </motion.div>
            )}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="nav-wiki"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            bounce: 0.3,
                            duration: 0.5,
                        }}
                        className="nav-wiki fixed w-[20%] bg-[#262b31] h-screen overflow-hidden z-50 shadow-[0_2px_4px_#262b31] "
                    >
                        <div className="tilte relative z-10 w-full bg-[#262b31] p-4 rounded-md shadow-lg">
                            <img
                                className="absolute top-0 left-0 h-full object-contain pointer-events-none"
                                src={getImageWiki("menu-side-title.png")}
                                alt=""
                            />
                            <div className="relative z-10 flex items-center justify-between h-12 px-4 text-[1.25em] font-bold text-[#969a99]">
                                <span>Mục lục</span>
                                <img
                                    src={getImageWiki("close.png")}
                                    alt="Đóng"
                                    className="h-12 w-12 rounded-full p-2 
                            shadow-[inset_0_6px_6px_rgba(0,0,0,0.9)] 
                            transition cursor-pointer"
                                    onClick={handleToggleMenuShow}
                                />
                            </div>
                        </div>
                        <div className="list-wiki relative mt-1 w-full h-fit bg-[#262b31] flex flex-col gap-5">
                            {navigation.map((option, idx) =>
                                option.action === "add" ? (
                                    <div
                                        key={option.name}
                                        className={`item-wiki relative w-[95%] h-[3rem] flex items-center gap-2 px-8 cursor-pointer`}
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <div className="item-wiki_img relative h-[60%] w-[20%]">
                                            <img
                                                className="absolute h-full"
                                                src={getImageWiki(option.icon)}
                                                alt=""
                                            />
                                        </div>
                                        <p>{option.name}</p>
                                    </div>
                                ) : (
                                    <Link
                                    href={option.href}
                                    key={idx}
                                    className={`item-wiki ${
                                        currentUrl === option.href ? "selected" : ""
                                    } relative w-[95%] h-[3rem] flex items-center gap-2 px-8`}
                                    >
                                    <div className="item-wiki_img relative h-[60%] w-[20%]">
                                        <img className="absolute h-full" src={getImageWiki(option.icon)} alt="" />
                                        {option.notifyCount > 0 && (
                                        <span className="absolute -top-2 right-2 p-1 text-xs bg-[#e1c296dd] text-[#262b31] rounded-full px-2">
                                            {option.notifyCount}
                                        </span>
                                        )}
                                    </div>
                                    <p>{option.name}</p>
                                    </Link>
                                )
                            )}

                            <LogInOut />
                        </div>
                        
                    </motion.div>
                )}
            
            </AnimatePresence>
            <AnimatePresence>
            {showAddModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center "
                onClick={() => setShowAddModal(false)}
              >
                <div
                  className="bg-[#1f1f1f] font-bold rounded-xl p-10 w-[90%] max-w-[30rem] max-h-[90vh] overflow-y-auto popup text-[#d4bf92] flex flex-col gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-xl font-bold text-center mb-2">Chọn loại bạn muốn thêm</h2>
                  <Link
                    href="/adm/lightcores/create"
                    className="bg-[#262b31] text-center py-3 rounded hover:opacity-90 transition cursor-pointer"
                  >
                    Nón Ánh Sáng
                  </Link>
                    <button
                        onClick={() => setIsSelectOpen(true)}
                        className="bg-[#262b31] cursor-pointer px-4 py-2 rounded hover:opacity-90 transition"
                        >
                        Di vật
                    </button>
                  {isSelectOpen && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={() => setIsSelectOpen(false)}
                    >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1f1f1f] text-white rounded-xl p-6 w-[90%] max-w-[30rem] flex flex-col gap-4 items-center"
                    >
                        <h2 className="text-xl font-bold mb-2">Chọn loại muốn tạo</h2>
                        <Link
                        href="/adm/relics/create"
                        className="bg-[#262b31] w-full text-center py-3 rounded hover:opacity-90 transition cursor-pointer"
                        >
                        Di Vật (Bộ 4)
                        </Link>
                        <Link
                        href="/adm/ornament/create"
                        className="bg-[#262b31] w-full text-center py-3 rounded hover:opacity-90 transition cursor-pointer"
                        >
                        Trang Sức (Bộ 2)
                        </Link>
                        <button
                        onClick={() => setIsSelectOpen(false)}
                        className="mt-4 text-sm text-gray-400 hover:text-white cursor-pointer"
                        >
                        Hủy
                        </button>
                    </motion.div>
                    </motion.div>
                )}

                  <Link
                    href="/adm/characters/create"
                    className="bg-[#262b31]  text-center py-3 rounded hover:opacity-90 transition"
                  >
                    Nhân Vật
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            <div className="recent">
                {!["paths", "elements", "admin", "home"].includes(pageUrl) && (
                    <RecentPanel
                        filterHistory={filterHistory}
                        pageUrl={pageUrl}
                    />
                )}
            </div>
        </>
    )
}

export default NavbarWiki
