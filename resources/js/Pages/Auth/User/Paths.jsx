import React, { useEffect, useState } from "react"
import "~css/path.css"
import { AnimatePresence, motion } from "framer-motion"
import parse from 'html-react-parser'
import WikiLayout from "../../../Layouts/WikiLayout"

function Paths({ paths }) {
    const [translateY, setTranslateY] = useState(-280)
    const [currentIndex, setCurrentIndex] = useState(3)
    const [transition, setTransition] = useState(0)

    const [isAnimating, setIsAnimating] = useState(false)
    const [path, setPath] = useState(paths[currentIndex - 3])

    const handleItemClick = (index, path) => {
        if (isAnimating || index === currentIndex) return
        setPath(path)
        const res = currentIndex > index ? 145.933 : -145.933
        setTranslateY((prev) => prev + res)
        setCurrentIndex(index)
        setTransition(500)
        setIsAnimating(true)

        setTimeout(() => {
            setTransition(0)
            setIsAnimating(false)
        }, 500)
    }

    const pathArr = [...paths.slice(-3), ...paths, ...paths.slice(0, 3)]
    useEffect(() => {
        if (currentIndex === pathArr.length - 2) {
            setTimeout(() => {
                setCurrentIndex(4)
                setTranslateY(-280 - 145.933)
            }, 500)
        } else if (currentIndex === 1) {
            setTimeout(() => {
                setCurrentIndex(9)
                setTranslateY(-280 + -145.933 * 6)
            }, 500)
        }
    }, [currentIndex])
    return (
        <WikiLayout title='Relics'>
            <motion.div 
            className="path_container">
                <motion.div
                className="path_show ">
                    <div className="path-warp">
                        <div className="sp-line">
                            <img
                                src="../../images/char-sp-line.5b4e64b.png"
                                alt=""
                            />
                        </div>
                        <img
                            src="../../images/down.png"
                            alt="down"
                            className="arrow-down"
                        />
                        <img
                            src="../../images/up.png"
                            alt="up"
                            className="arrow-up"
                        />
                        <div className="swiper_container">
                            <div
                                className="swiper-wrapper"
                                style={{
                                    transform: `translate3d(0px, ${translateY}px, 0px)`,
                                    transitionDuration: `${transition}ms`,
                                }}
                            >
                                {pathArr.map((path, index) => (
                                    <div
                                        key={index}
                                        className="swiper-slide h-[120.333px]"
                                        onClick={() =>
                                            handleItemClick(index, path)
                                        }
                                        id={index}
                                    >
                                        <div className="item p-1 cursor-pointer">
                                            <div className="img">
                                                <img
                                                    src={`https://res.cloudinary.com/dcto9suhy/image/upload/v1744512341/${path.image}`}
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <motion.div className="path_content">
                        <div className="main_title ">
                            <div className="title">Vận Mệnh</div>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                className={`main_content`}
                                key={path.id}>
                                <img className='opacity-[0.6] ' src="../../images/c2e8e7cc2c122fb01a39723df4277756_1456190579364779157.png" />
                                    <motion.div
                                    className="poster-container z-30"
                                        key={path.id}
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -100, opacity: 0 }}
                                        transition={{
                                            duration: .5,
                                            ease: "easeInOut"
                                        }}
                                        style={{ position: "absolute" }}
                                    >
                                        <div className={`poster-path`}>
                                            <img
                                                className="w-[100%] object-cover"
                                                src={`https://res.cloudinary.com/dcto9suhy/image/upload/v1744512341/${path.aeon_img}`}
                                                alt={`${path.name}`}
                                            />
                                        </div>
                                        <div className={`subtitle-container`}>
                                            <p>{path.pathDesc}</p>
                                        </div>
                                    </motion.div>
                                
                                    <motion.div 
                                        key={path.name}
                                        className={`content-container absolute top-0 h-full w-[60%] z-50`}
                                        initial= {{y: 100, opacity: 0}}
                                        animate= {{y: 0, opacity: 1}}
                                        exit={{y: 100, opacity: 0}}
                                        transition={{ duration: .5, ease: "easeInOut"}}
                                        >
                                        <div className="header-warp w-[25.75rem] h-[5.5rem] relative items-center flex left-[1.2rem] ">
                                        <img
                                                className="w-[3.3125rem] h-[3.3125rem]"
                                                src={`https://res.cloudinary.com/dcto9suhy/image/upload/v1744512341/${path.image}`}
                                                alt={`${path.name}`}
                                            />
                                            <div className='right ml-[2rem] z-30'>
                                                <div className="name-path text-[#ededed] text-[1.6rem] whitespace-nowrap">{path.name}</div>
                                                <div className="name-aeon text-[#ededed] mt-[.5rem] text-[.9rem]">Aeon: {path.aeon}</div>
                                            </div>
                                        </div>
                                        <div className="mechDesc">
                                            {parse(path.mechDesc)}
                                        </div>
                                    </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.div>
        </WikiLayout>
    )
}

export default Paths
