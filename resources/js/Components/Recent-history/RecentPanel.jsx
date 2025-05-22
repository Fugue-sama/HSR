import React, { useEffect, useRef, useState } from 'react'
import Recent from './Recent'
import { getImgPublic } from '../../Utils/getImagePath'

const RecentPanel = ({filterHistory, pageUrl }) => {
  if(pageUrl == 'profile') return
  const [isOpen, setIsOpen] = useState(false)
  const recentRef = useRef(null)

      useEffect(() => {
          const handleClickOutSide = (event) => {
              if (
                  recentRef.current &&
                  !recentRef.current.contains(event.target)
              ) {
                  setIsOpen(false)
              }
          }
          document.addEventListener("mousedown", handleClickOutSide)
          return () => {
              document.removeEventListener("mousedown", handleClickOutSide)
          }
      }, [])

  return (
      <div
        ref={recentRef}
        className={`recent-box fixed right-12 bottom-0 w-[250px] z-[999] transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[100%]'}`}
      >
        <div
          className="recent-toggle absolute top-[-43.5px] z-P20 left-0 w-[50%] text-center py-2 bg-[#282828] text-[#dbc294] text-lg font-bold border border-[#dbc294] border-b-0 rounded-t-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Đã Lọc
        </div>
    
        <div className="recent-content bg-[#282828] text-white border border-[#dbc294] border-b-0 rounded-r-[2px] p-4 h-fit max-h-[280px] overflow-y-auto space-y-2">
          {filterHistory.length > 0 ? (
            <Recent filterHistory={filterHistory} pageUrl={pageUrl} />
          ) : (
            <div className='flex justify-center py-5 opacity-50'>
            <img className='w-[2rem] ' src={getImgPublic('logo-web.webp')} alt="" />
            </div>
          )}
        </div>
      </div>
    )
  
}

export default RecentPanel
