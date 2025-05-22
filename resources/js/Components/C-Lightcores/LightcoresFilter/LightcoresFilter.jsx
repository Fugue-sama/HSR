import React, { useEffect, useRef, useState } from 'react'
import PathRarity from './Paths-Rarity/PathRarity'
import TypeRoll from './Types-Roll/TypeRoll'
import { router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { SaveCookie } from '../../../Utils/Cookie/SaveCookie'

function LightcoresFilter({auth, paths, filterRef,isOpen, setIsOpen, setSetOpen, setOpen }) {
    const [checkedItems, setCheckedItems] = useState({})
    const [countOption, setCountOption] = useState(0)

    const [setCheckeds, setSetCheckeds] = useState({})
    const [countSet, setCountSet] = useState(0)
  
    // path - rarity 
    const [filters, setFilters] = useState({
      p: {},
      r: {},
      c: {},
      s: {}
    })

    const handleAccept = () => {
      const checkedItms = Object.keys(checkedItems)
      const rolls = Object.keys(setCheckeds)
  
      const newFilters = {
          ...filters,
          c: checkedItms.reduce((acc, item) => ({ ...acc, [item]: { name: item } }), {}),
          s: rolls.reduce((acc, item) => ({ ...acc, [item]: { name: item } }), {}),
      }
  
      setFilters(newFilters)
      setCountSet(0)
      setSetCheckeds({})
      setCountOption(0)
      setCheckedItems({})
      setIsOpen(false)
      setSetOpen(false)
      router.get(route(auth.user ? 'adm.lightcores.filter' :'lightcores.filter'), {
          p: Object.keys(newFilters.p),
          r: Object.keys(newFilters.r).map(Number),
          c: checkedItms,
          s: rolls
      }, {
          preserveState: true,
          replace: true
      })
      SaveCookie(newFilters, 'filterHis_lightcores')
  }
  
    useEffect(() => {
          if (!isOpen) {
            setCountOption(0)
            setCheckedItems({})
        }
    }, [isOpen])
    useEffect(() => {
        if (!setOpen) {
            setCountSet(0)
            setSetCheckeds({})
        }
    }, [setOpen])


  return (
    <div ref={filterRef} className='w-screen z-30'>
      <div className='lightcores-filter relative flex gap-2.5 justify-start flex-col translate-x-[20rem] w-full'>
        <PathRarity auth={auth} filters={filters} setFilters={setFilters}  paths={paths} />
        <TypeRoll 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          countOption={countOption}
          setCountOption={setCountOption}
          handleAccept={handleAccept}
          setOpen = {setOpen}
          setSetOpen= {setSetOpen}
          setCheckeds={setCheckeds}
          setSetCheckeds={setSetCheckeds}
          countSet={countSet}
          setCountSet={setCountSet}
        />
      </div>
    </div>
  )
}

export default LightcoresFilter