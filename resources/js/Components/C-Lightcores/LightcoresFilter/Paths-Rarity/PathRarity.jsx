import Hashids from 'hashids'
import { getImage, getImageWiki } from '../../../../Utils/getImagePath'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { SaveCookie } from '../../../../Utils/Cookie/SaveCookie'

function PathRarity({filters, setFilters, paths, auth}) {

    const hashid = new Hashids('salt', 8)
    
    const handleFilterChange = (type, value, name) => {
        setFilters(prev => {
            const newType = { ...prev[type] }
    
            if (newType[value]) {
                delete newType[value]
            } else {
                newType[value] = { name }
            }
    
            const newFilters = { ...prev, [type]: newType }
    
            setTimeout(() => {
                const Filters = {
                    p: Object.keys(newFilters.p),
                    r: Object.keys(newFilters.r).map(Number)
                }
                router.get(route(auth.user ? 'adm.lightcores.filter' :'lightcores.filter'), {
                    p: Filters.p,
                    r: Filters.r
                }, {
                    preserveState: true,
                    replace: true
                })
            }, 100)
            SaveCookie(newFilters, 'filterHis_lightcores')
            return newFilters
        })

    }
  
    const options = [
        { name: 'Vận Mệnh', type: 'path' },
        { name: 'Cấp Bậc', type: 'limit' },
    ]

  return (
      <div className="options w-[80%] flex flex-col gap-2.5 justify-start">
      {options.map((option) => (
          <div key={option.name} className='filter-row element h-[40px]'>
              <div className='filter-items flex items-center justify-start gap-5 h-full'>
                  <p className='text-[#8f959c] text-[1rem] font-bold w-[20%]'>
                      {option.name}
                  </p>
                  <div className='filters-items flex items-center gap-5 h-full relative'>
                      {option.type === 'path' ? (
                          paths.map(path => {
                              const hashID = hashid.encode(path.id)
                              return (
                                  <div
                                  onClick={()=> handleFilterChange('p',hashID, path.name)}
                                  className={`btnFilter type-item h-full ${filters['p'][hashID] ? 'selected': ''} rounded-full`}
                                  key={path.name}
                              >
                                  <img
                                      className='h-full'
                                      src={getImage(path.image)}
                                      alt={path.name}
                                  />
                              </div>
                              )
                          })
                      ) : (
                          <div className='flex gap-5'>
                              {[4, 5].map((rarity) => (
                                  <div 
                                  onClick={()=> handleFilterChange('r', rarity)}
                                  key={rarity} 
                                  className={`btnFilter type-item p-1 rounded-tr-lg ${filters['r'][rarity] ? 'selected': ''} 'border-white/8'}`}>
                                      {Array(rarity)
                                          .fill(0)
                                          .map((_, i) => (
                                              <img
                                                  key={i}
                                                  src={getImageWiki('level_star.png')}
                                                  alt=''
                                                  className='h-5 w-5 inline'
                                              />
                                          ))}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      ))}
      </div>
  )
}

export default PathRarity