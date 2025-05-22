import React from 'react'
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import CustomizedYTick from './CustomizedYTick'

function Chart({stats_data}) {
  const barColors = ['#05a36a', '#cf1918', '#ffba00', '#92e2e3', '#ff7a01']
  const lableBlocks = ['#05a36a', '#cf1918', '#ffba00', '#92e2e3', '#ff7a01']

  return (
    <BarChart
      width= {350}
      height={250}
      data={stats_data}
      layout='vertical'
      margin={{left: 100, right: 20, top: 20, bottom: 20}}
    >
      <XAxis type='number' axisLine={false} tickLine={false} tick={false}/>
      <YAxis type='category' dataKey='name' axisLine={false} tickLine={false} 
        tick={
          <CustomizedYTick data={stats_data} blockColors={lableBlocks} />
        }
      />
      <Tooltip />
      <Bar dataKey='value'>
        {stats_data.map((entry, idx)=>(
          <Cell key={idx} fill={barColors[idx % barColors.length]} />
        ))}
      </Bar>
    </BarChart>
  )
}

export default Chart 