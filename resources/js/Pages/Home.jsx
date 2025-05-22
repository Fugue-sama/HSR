import { Head, Link, usePage } from "@inertiajs/react"
import "~css/home.css"
import Starfield from "../Components/Navbar/Starfield"
import { getImageWiki, getImgPublic } from "../Utils/getImagePath"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Auth from "../Components/AdminLayout/logoAuth/auth"

function Home() {
    const { auth } = usePage().props
    const { component } = usePage()
    const [showLink, setShowLink] = useState(false)

    const accountRef = useRef(null)

    const mediaLinks = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/HonkaiStarRail.VN/",
            svg: (
                <path
                    d="M44.278 26.336h6.577v-7.854h-6.577c-5.044 0-9.194 4.086-9.194 9.194v3.959h-5.236v7.854h5.236v20.943h7.854v-21.007h6.577l1.341-7.854h-7.917v-3.959c0-0.702 0.575-1.277 1.341-1.277z"
                    fill="#fff"
                />
            ),
        },
        {
            name: "Discord",
            url: "https://discord.com/invite/honkaistarrail",
            svg: (
                <path
                    d="M55.91 25.549c-3.028-1.405-6.199-2.378-9.442-2.919-0.433 0.793-0.864 1.621-1.225 2.451-3.459-0.54-7.027-0.54-10.488 0-0.36-0.83-0.757-1.658-1.225-2.451-3.279 0.54-6.451 1.55-9.478 2.919-5.946 8.865-7.568 17.479-6.776 25.984v0c3.495 2.595 7.424 4.542 11.605 5.839 0.937-1.261 1.767-2.595 2.487-4.001-1.37-0.504-2.667-1.117-3.929-1.874 0.324-0.253 0.65-0.47 0.973-0.721 7.351 3.459 15.858 3.459 23.172 0 0.324 0.253 0.648 0.504 0.973 0.721-1.261 0.721-2.558 1.37-3.929 1.874 0.721 1.405 1.55 2.739 2.487 4.001 4.181-1.261 8.108-3.244 11.605-5.803v0c0.937-9.911-1.621-18.453-6.811-26.020zM32.413 46.307c-2.271 0-4.145-2.054-4.145-4.577s1.802-4.577 4.109-4.577 4.181 2.054 4.145 4.577-1.838 4.577-4.109 4.577zM47.621 46.307c-2.271 0-4.109-2.054-4.109-4.577s1.802-4.577 4.109-4.577 4.145 2.054 4.109 4.577-1.802 4.577-4.109 4.577z"
                    fill="#fff"
                />
            ),
        },
    ]
    const navItems = [
        { name: "Nhân Vật", href: "/characters", img: "icon-character.png" },
        { name: "Di Vật", href: "/relics", img: "icon-relics.png" },
        {
            name: "Nón Ánh Sáng",
            href: "/lightcores",
            img: "icon-lightcore.png",
        },
        { name: "Vận Mệnh", href: "/paths", img: "path.png" },
        { name: "Thuộc Tính", href: "/elements", img: "element.png" },
    ]
    const boxNavVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
    }

    const shareItemVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.5 },
        },
    }

    const footerVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setShowLink(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    return (
        <div className="box-home overflow-y-auto overflow-x-hidden relative h-fit flex gap-0 flex-col scroll-smooth ">
            <Head title={component} />
            <div className="screen-container">
                <Auth />
                <Starfield />
                <div className="screen w-screen h-fit flex justify-center relative mt-25 ">
                    <motion.div
                        variants={boxNavVariants}
                        initial="hidden"
                        animate="visible"
                        className="box-nav w-[60%] h-[80%] bg-[#262b31] p-10 flex flex-wrap justify-between rounded-2xl"
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="relative truncate nav-item border border-[#dac390] w-[7rem] h-7rem] text-[#dac390] rounded-2xl flex flex-col justify-evenly items-center shadow-[6px_6px_10px_rgba(0,0,0,0.4)] transition duration-200 hover:cursor-pointer hover:shadow-[0_0_20px_rgba(218,195,144,0.5)]"
                            >
                                <div className="h-[50%] w-[50%] relative">
                                    <img
                                        className="object-contain absolute h-full w-full"
                                        src={getImageWiki(item.img)}
                                        alt=""
                                    />
                                </div>
                                <p className="text-[.75rem] font-bold">
                                    {item.name}
                                </p>
                            </Link>
                        ))}
                        <div className="nav-item" ref={accountRef}>
                            <div
                                onClick={() => setShowLink(!showLink)}
                                className="relative truncate nav-item border border-[#dac390] w-[7rem] h-[7rem] text-[#dac390] rounded-2xl flex flex-col justify-evenly items-center shadow-[6px_6px_10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:cursor-pointer hover:shadow-[0_0_20px_rgba(218,195,144,0.5)]"
                            >
                                <div className="h-[50%] w-[50%] relative">
                                    <img
                                        className="object-contain absolute h-full w-full"
                                        src={getImageWiki("account.png")}
                                        alt=""
                                    />
                                </div>
                                <p className="text-[.75rem] font-bold">
                                    {auth.user ? "Đăng Xuất" : "Tài Khoản"}
                                </p>
                                {!auth.user
                                    ? showLink && (
                                          <div className="absolute flex justify-evenly items-center flex-col w-full h-full text-[.9rem] bg-[#00000080] ">
                                              <Link
                                                  href="/login"
                                                  className="hover:border rounded-2xl border-amber-50  p-2"
                                              >
                                                  Đăng Nhập
                                              </Link>
                                              <Link
                                                  href="/register"
                                                  className="hover:border rounded-2xl border-amber-50  p-2"
                                              >
                                                  Đăng Ký
                                              </Link>
                                          </div>
                                      )
                                    : showLink && (
                                          <div className="absolute flex justify-evenly items-center flex-col w-full h-full text-[.9rem] bg-[#00000080] ">
                                              <Link
                                                  href="/profile"
                                                  className="hover:border rounded-2xl border-amber-50  p-2"
                                              >
                                                 Tài Khoản
                                              </Link>
                                              <Link
                                                  href="/logout"
                                                  className="hover:border rounded-2xl border-amber-50  p-2"
                                              >
                                                  Đăng Xuất
                                              </Link>
                                          </div>
                                      )}
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    variants={shareItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="share-item-wrap"
                >
                    <div className="follow">Follow</div>
                    <div className="line"></div>

                    <div className="media-list flex justify-center items-center flex-col gap-2 w-full">
                        {mediaLinks.map((media, index) => (
                            <div
                                key={index}
                                className="media-icon w-full h-[3em] cursor-pointer"
                                onClick={() => window.open(media.url, "_blank")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    width="60"
                                    height="40"
                                    viewBox="0 0 80 80"
                                >
                                    <title>{media.name}</title>
                                    {media.svg}
                                </svg>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <motion.div
                variants={footerVariants}
                initial="hidden"
                animate="visible"
                className="footer bg-black py-0 px-[30px] pt-[10px] relative z-20"
            >
                <div className="footer-inside relative bg-black text-white flex-col items-center justify-start">
                    <div className="footer-main p-10">
                        <div className="wrapper-footer m-[10px] flex justify-center items-center max-w-full">
                            <div className="logo-footer w-[17.8125rem] h-[4.9375rem] flex justify-between relative">
                                <img
                                    src="../../images/logo.png"
                                    className="absolute w-fit h-[100%] left-0"
                                    alt="logo"
                                />
                                <img
                                    src={getImgPublic("naruto.png")}
                                    className="right-0 absolute w-fit h-[100%]"
                                    alt="logo"
                                />
                            </div>
                        </div>
                        <div className="wrapper-footer m-[5px] flex justify-center items-center max-w-full text-center text-gray-500 text-sm px-4">
                            <p className="whitespace-pre-wrap">
                                All rights for the game <em>Honkai</em> and its
                                related images, trademarks, and materials belong
                                to HoYoverse (miHoYo / COGNOSPHERE). This
                                project is a non-commercial student assignment
                                and is not affiliated with or endorsed by
                                HoYoverse. No profit is made and no fees are
                                charged.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Home