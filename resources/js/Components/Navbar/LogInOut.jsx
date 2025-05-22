import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { Link, router, usePage } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { getImageWiki } from "../../Utils/getImagePath"

function LogInOut() {
    const { auth } = usePage().props

    const loginoutRef = useRef(null)
    const [showDropdownLogInOut, setShowDropdownLogInOut] = useState(false)
    const handleLogout = () => {
        router.get("/logout", {})
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                loginoutRef.current &&
                !loginoutRef.current.contains(event.target)
            ) {
                setShowDropdownLogInOut(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return (
        <>
            {!auth.user ? (
                <Link
                    href="/login"
                    className={`item-wiki bottom-5 bg-[#262b31] fixed w-[19%] left-1 h-[4rem] flex items-center gap-2 px-5 decoration-0 outline-0 `}
                >
                    <div className="item-wiki_img relative h-[60%] w-[20%]">
                        <img
                            className="absolute h-full"
                            src={getImageWiki("user.png")}
                            alt=""
                        />
                    </div>
                    <p className="whitespace-nowrap">Đăng Nhập</p>
                </Link>
            ) : (
                <>
                    <div
                        ref={loginoutRef}
                        className="item-wiki relative right-40 bg-[#262b31] w-[19%] left-1 bottom-12 flex items-center text-center"
                        onClick={() =>
                            setShowDropdownLogInOut(!showDropdownLogInOut)
                        }
                    >
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                            className={`item-wiki bottom-0  fixed w-[19%] left-1 h-[4rem] bg-[#262b31] flex items-center gap-2 px-5 decoration-0 outline-0`}
                        >
                            <div
                                className="p-2 w-full flex items-center gap-2"
                                >
                                <div className="item-wiki_img relative h-[2rem] w-[2rem]">
                                    <img
                                    className="absolute h-full"
                                    src={getImageWiki("user.png")}
                                    alt=""
                                    />
                                </div>
                                <p>{auth.user.name}</p>
                                <ChevronDownIcon
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                    showDropdownLogInOut ? "rotate-180 text-[#d4bf92]" : ""
                                    }`}
                                />
                                </div>
                            <AnimatePresence>
                                {showDropdownLogInOut && (
                                    <motion.div
                                        key="dropdown"
                                        initial={{ opacity: 0, x: -200 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        exit={{ opacity: 0, x: -200 }} 
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute bottom-10 w-full bg-[#282828] translate-x-full rounded overflow-hidden selected-none"
                                    >
                                        <div className="flex justify-between flex-col gap-2 items-center text-sm text-center px-1 py-5  select-none">
                                            <Link  
                                            href="/profile"
                                            className="btn w-full whitespace-nowrap py-3 text-[#7f8181] hover:text-[#d4bf92]">
                                                Tài khoản
                                            </Link>
                                            <div
                                                onClick={handleLogout}
                                                className="btn w-full whitespace-nowrap py-3 text-[#7f8181] hover:text-[#d4bf92]"
                                            >
                                                Đăng Xuất
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
        </>
    )
}

export default LogInOut
