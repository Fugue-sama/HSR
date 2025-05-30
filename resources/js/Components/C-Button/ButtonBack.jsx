import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import React from 'react'

function ButtonBack() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.button
        onClick={handleBack}
        title="Quay lại trang trước"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{duration: .3, ease: easeInOut}}
        className="reset-btn fixed left-10 p-2 rounded-full transition-all outline-none focus:outline-none ring-0 focus:ring-0
                   hover:scale-110 active:scale-95 hover:-translate-x-[.5rem] "
        style={{ cursor: 'pointer', zIndex: 10 }}
      >
        <svg
          height="2rem"
          width="2rem"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          {/* SVG content giữ nguyên */}
          <g>
            <path
              style={{ fill: '#dcc099' }}
              d="M373.643,506.2c-2.891,0-5.814-0.813-8.415-2.517L6.949,268.862C2.611,266.02,0,261.186,0,256
              s2.611-10.02,6.949-12.862L365.23,8.32c7.106-4.658,16.635-2.67,21.29,4.432c4.655,7.103,2.671,16.635-4.432,21.29L43.431,256
              l338.658,221.959c7.103,4.655,9.087,14.187,4.432,21.29C383.569,503.753,378.655,506.2,373.643,506.2z"
            />
            <path
              style={{ fill: '#dcc099' }}
              d="M496.622,506.198c-2.945,0-5.879-0.844-8.43-2.516L129.91,268.862
              c-4.336-2.842-6.949-7.678-6.949-12.862c0-5.184,2.611-10.02,6.949-12.862L488.192,8.32c7.106-4.658,16.637-2.67,21.29,4.432
              c4.656,7.103,2.671,16.635-4.432,21.29L166.393,256l314.85,206.355V135.082c0-8.493,6.886-15.378,15.378-15.378
              s15.378,6.885,15.378,15.378v355.739c0,5.65-3.099,10.844-8.069,13.529C501.643,505.586,499.129,506.198,496.622,506.198z"
            />
            <polygon
              style={{ fill: '#dcc099' }}
              points="432.33,376.922 262.758,256 432.33,135.08"
            />
            <path
              style={{ fill: '#dcc099' }}
              d="M432.332,392.3c-3.145,0-6.274-0.963-8.93-2.857l-169.57-120.922
              c-4.047-2.886-6.449-7.55-6.449-12.52c0-4.97,2.404-9.634,6.449-12.52l169.57-120.92c4.687-3.342,10.85-3.787,15.97-1.15
              c5.119,2.636,8.336,7.912,8.336,13.671v241.843c0,5.759-3.217,11.033-8.336,13.671
              C437.153,391.737,434.737,392.3,432.332,392.3z M289.245,256l127.708,91.069V164.933L289.245,256z"
            />
          </g>
        </svg>
      </motion.button>
    </AnimatePresence>
  )
}

export default ButtonBack
