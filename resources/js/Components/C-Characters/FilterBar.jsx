import React, { memo } from 'react'
import { getPathImg } from '~utils/getImagePath'
import parse from 'html-react-parser'

const FilterBar = ({ activeFilter, onFilter, elements, paths }) => {
  const isActive = (type, id) => activeFilter?.type == type && activeFilter?.value == id

  const handleClick = (type, value) => {
    onFilter(type, value)
  }

  return (
    <div className="filter-bar shadow-[4px_0px_12px_rgba(0,0,0,0.3)] relative ml-6 mr-6 z-30 bg-[#282828] h-[100px] rounded-tl-[10px] rounded-bl-[10px] flex justify-center p-[12px_24px] flex-wrap gap-[10px] overflow-auto custom-scrollbar">
     <div
        key="stellar"
        className={`tabs-control cursor-pointer ${isActive('stellar', true) ? 'active' : ''}`}
        onClick={() => handleClick('stellar', true)}
      >
        <img
          src={getPathImg('ngoc-anh-sao.webp')}
          className="tabs__label-image"
          alt="Stellar Jade"
        />
      </div>

      {[4, 5].map(rarity => (
        <div
          key={rarity}
          className={`tabs-control cursor-pointer ${isActive('rarity', rarity) ? 'active' : ''}`}
          onClick={() => handleClick('rarity', rarity)}
        >
          <img
            src={getPathImg(`${rarity}-sao.png`)}
            className="tabs__label-image"
            alt={`${rarity} sao`}
          />
        </div>
      ))}

      {/* Element filters */}
      {elements.map(element => (
        <div
          key={element.id}
          className={`tabs-control cursor-pointer ${isActive('element', element.id) ? 'active' : ''}`}
          onClick={() => handleClick('element', element.id)}
        >
          <img
            src={`https://res.cloudinary.com/dcto9suhy/image/upload/v1744512341/${element.image_id}`}
            className="tabs__label-image"
            alt={element.name}
          />
          <div className="tabs__label-text">{parse(element.name)}</div>
        </div>
      ))}

      {/* Path filters */}
      {paths.map(path => (
        <div
          key={path.id}
          className={`tabs-control cursor-pointer ${isActive('path', path.id) ? 'active' : ''}`}
          onClick={() => handleClick('path', path.id)}
        >
          <img
            src={`https://res.cloudinary.com/dcto9suhy/image/upload/v1744512341/${path.image}`}
            className="tabs__label-image"
            alt={path.name}
          />
          <div className="tabs__label-text">{path.name}</div>
        </div>
      ))}
    </div>
  )
}

export default memo(FilterBar)
