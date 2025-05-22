import React from 'react'

function CustomizedYTick ({x, y, payload, data, blockColors}) {
  // tìm index cho data lable
  const index = data.findIndex(item => item.name === payload.value)
  const blockColor = blockColors[index % blockColors.length]

  const BLOCK_HEIGHT = 20
  const BLOCK_WIDTH = 20
  const OFFSET_X = -120

  return (
    <g transform={`translate(${x + OFFSET_X}, ${y - BLOCK_HEIGHT / 2})`}>
      <rect x={0} y={0} width={BLOCK_WIDTH} height={BLOCK_HEIGHT} fill={blockColor} />
      <text x={BLOCK_WIDTH + 10} y={BLOCK_HEIGHT} textAnchor='start' fontSize={16} fill='#fff'>
      {payload.value}
      </text>
    </g>
   
  )
}

export default CustomizedYTick 