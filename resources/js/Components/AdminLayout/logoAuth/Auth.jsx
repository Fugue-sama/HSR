import { usePage } from '@inertiajs/react'
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

function Auth() {
  const { auth } = usePage().props
  const boxNavVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
}
  return (
    <div>
       {auth.user && (
            <motion.div
            variants={boxNavVariants}
            initial="hidden"
            animate="visible"
            className={`fixed px-4 py-2 z-30 text-[#ddc193] right-[10rem] bg-[#151e29] rounded-b-2xl text-md font-bold flex items-center gap-3 p-10`}
            >
                <p className="select-none">
                    Chào mừng 「{auth.user.name}」
                </p>
            </motion.div>
        )}
    </div>
  )
}

export default Auth