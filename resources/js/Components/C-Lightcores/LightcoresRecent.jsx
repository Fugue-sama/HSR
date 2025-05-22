import React from 'react'

function LightcoresRecent({filterHistory}) {
    const result = filterHistory.map(entry => entry.data)
    const namesP = result.flatMap(data => Object.values(data.p).map(item=> item.name))
    const types = result.flatMap(data => Object.values(data.c).map(item=> item.name))
  
    return (
      <>
          <div className=' h-fit flex flex-col gap-1'>
            
            <div className="path-container-filter">
              <h2 className='text-[#d9be91] font-bold text-[1.2rem]'>Vận Mệnh</h2>
              {namesP.map((name, index) => (
                  <div key={index} className='relative px-2 py-1 text-[#969b96]' >
                    <p className=''>{name}</p>
                  </div>
                )
              )}
            </div>
            <div className="other-container-filter">
              <h2 className='text-[#d9be91] font-bold text-[1.2rem]'>Khác</h2>
              {types.map((name, index) => (
                  <div key={index} className='relative px-2 py-1 text-[#969b96]' >
                    <p className=''>{name}</p>
                  </div>
                )
              )}
            </div>
          </div>
      </>
    )
}

export default LightcoresRecent