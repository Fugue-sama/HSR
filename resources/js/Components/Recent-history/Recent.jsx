import React from 'react'
import parse from 'html-react-parser'
import LightcoresRecent from '../C-Lightcores/LightcoresRecent'

const CharactersRecent = ({ filterHistory }) => {
  const result = filterHistory.map(entry => entry.data)
  const namesP = result.flatMap(data => Object.values(data.p).map(item => item.name))
  const namesE = result.flatMap(data => Object.values(data.e).map(item => item.name))

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[#d9be91] font-bold text-[1.2rem] mb-1">Thuộc Tính</h2>
        {namesE.map((name, index) => (
          <div
            key={index}
            className="recent-item bg-white/5 px-3 py-2 rounded text-sm text-white"
          >
            {parse(name)}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-[#d9be91] font-bold text-[1.2rem] mb-1">Vận Mệnh</h2>
        {namesP.map((name, index) => (
          <div
            key={index}
            className="recent-item bg-white/5 px-3 py-2 rounded text-sm text-[#969b96]"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

function Recent({ filterHistory, pageUrl }) {
  if (!filterHistory?.length) return null

  if (pageUrl === 'relics') {
    return (
      <div className="space-y-2">
        {filterHistory.map((entry, i) =>
          entry.data.map((item, j) => (
            <div
              key={`${i}-${j}`}
              className="recent-item bg-white/5 px-3 py-2 rounded text-sm text-[#ddc192]"
            >
              {item}
            </div>
          ))
        )}
      </div>
    )
  }

  if (pageUrl === 'characters') {
    return <CharactersRecent filterHistory={filterHistory} />
  }

  if (pageUrl === 'lightcores') {
    return <LightcoresRecent filterHistory={filterHistory} />
  }

  return null
}

export default Recent
