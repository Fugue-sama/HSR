import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import parse from "html-react-parser"
import { getImage } from  "~utils/getImagePath"

const skillKeys = ["basis", "skill", "ultimate", "talent", "technique"]

const path_line = ['destruction_wiv5vh', 'hunt_znafvz', 'erudition_ynmee7', 'harmony_kvcpz1', 'nihility_tc4cz3', 'preservation_ywtbrn', 'abundance_zgxpc8', 'memory_vcdrqg']

function SkillsAdmin ({pathID, skills }) {
  const path = path_line[pathID -1]
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % skillKeys.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + skillKeys.length) % skillKeys.length)
  }
  return (
   <>
    <div className="trace-content relative w-full h-full flex justify-center items-center">
        <img src="../../images/bgpath.png" loading='lazy' className='absolute w-full h-full select-none' alt="" />
        <img src={getImage(path)} loading='lazy' className='absolute object-contain w-full h-full select-none' alt="" />

        <AnimatePresence initial={false} custom={direction}>
          {skillKeys.map((key, i) => {
            if (i !== index) return null
            const skill = skills[key]
            return (
              <motion.div
                key={key}
                custom={direction}
                initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="trace-card h-[550px] w-[380px] z-10 rounded-2xl p-1 absolute"
              >
                <div className="trace-gif bg-[#0d172871] p-2 h-full flex flex-col rounded-2xl">
                  <div className="img flex flex-col justify-center items-center">
                    <img
                      className='w-[20%] p-1 pointer-events-none select-none'
                      loading='lazy'
                      src={
                        skill?.image && skill.image !== "null"
                          ? getImage(skill.image)
                          : "https://res.cloudinary.com/dcto9suhy/image/upload/v1745210125/ulti_gxvvqq.gif"
                      }
                      alt="skill"
                    />
                   {skill?.gif && skill.gif !== "null" && (
                      <img
                        className='rounded-2xl pointer-events-none h-[75%] select-none'
                        loading='lazy'
                        src={getImage(`${skill.gif}.gif`)}
                        alt="skill"
                      />
                    )}
                  </div>
                 
                  <div className="trace trace-name p-0.5 text-[1rem] overflow-hidden text-center font-bold text-[hsla(0,0%,100%,.45)] whitespace-nowrap">
                    {skill?.name}
                  </div>
                  <div
                    className="trace whitespace-normal trace-desc p-1 text-[1rem] text-left font-bold text-[hsl(0,0%,100%)] overflow-y-auto scrollbar mt-1 flex-1"
                  >
                    { /<\/?[a-z][\s\S]*>/i.test(skill.desc || "") ? parse(skill?.desc || "") : <p style={{ whiteSpace: 'pre-line' }}>{skill.desc}</p>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="absolute w-full justify-around bottom-20 left-1/2 -translate-x-1/2 flex gap-10 z-20">
        <button
          onClick={handlePrev}
          className="px-10 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-10 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition cursor-pointer"
        >
          Next
        </button>
      </div>
   </>
  )
}

export default SkillsAdmin
