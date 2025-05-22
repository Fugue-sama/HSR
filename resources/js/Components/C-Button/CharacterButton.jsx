import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CharacterButton({ handleNext, handlePrev }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full justify-evenly flex gap-20 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="px-6 py-2 cursor-pointer bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 12H7L11 16M9 10L11 8"
              stroke="#dcc099"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-6 py-2 cursor-pointer bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 12H17L13 16M15 10L13 8"
              stroke="#dcc099"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}

export default CharacterButton
