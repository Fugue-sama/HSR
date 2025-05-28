import { useState, useEffect } from 'react'
import { FlagIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

export const ReportList = ({ reports, onSkip, onBlock, onDelete }) => {
  const [openedReports, setOpenedReports] = useState([])
  const [readReports, setReadReports] = useState([])

  const handleOpen = async (report) => {
    const id = report.id

    if (!openedReports.includes(id)) {
      setOpenedReports(prev => [...prev, id])
    }

    if (!readReports.includes(id) && !report.is_read) {
      try {
        await axios.post(`/api/reports/${id}/mark-read`)
        setReadReports(prev => [...prev, id])
      } catch (error) {
        console.error('Không thể đánh dấu đã đọc:', error)
      }
    }
  }

  useEffect(() => {
    const alreadyRead = reports.filter(r => r.is_read).map(r => r.id)
    setReadReports(alreadyRead)
  }, [reports])

  if (reports.length === 0) {
    return <p className="text-gray-400 text-center">Chưa có báo cáo nào.</p>
  }

  return reports.map(report => {
    const isOpened = openedReports.includes(report.id)
    const isRead = readReports.includes(report.id)
    const borderColor = !isRead ? 'border-[#dac29b]' : 'border-gray-700'

    return (
      <div
        key={report.id}
        className={`bg-[#1e1e1e] flex gap-4 border ${borderColor} rounded-lg p-4 mb-4 cursor-pointer`}
        onClick={() => handleOpen(report)}
      >
        <div className='w-[90%] relative'>
          <div className="flex items-center gap-2 mb-2">
            <FlagIcon className="w-5 h-5 text-red-400" />
            <p className="text-sm text-gray-400">Bình luận ID: {report.comment_id}</p>
          </div>
          <p className="mb-2">"{report.comment.content}"</p>
          <p className="text-sm">Người báo cáo: <b>User #{report.user_id}</b></p>
          <p className="text-sm">Lý do: <i>{report.reason || 'Không có'}</i></p>
          <p className="text-xs text-gray-500 mt-2">Ngày báo cáo: {new Date(report.created_at).toLocaleString()}</p>
        </div>

        {isOpened && (
          <div className="mt-4 flex gap-3 flex-col text-[#d4bc94] font-bold">
            <button
              className="p-1 bg-[#262b31] rounded hover:bg-gray-700 text-[.8rem] whitespace-nowrap cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onSkip(report.id) }}
            >
              Bỏ qua
            </button>
            <button
              className="p-1 bg-[#262b31] rounded hover:bg-red-700 text-[.8rem] whitespace-nowrap cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onBlock(report.user_id, report.comment_id, report.id) }}
            >
              Chặn user
            </button>
            <button
              className="p-1 bg-[#262b31] rounded hover:bg-yellow-700 text-[.8rem] whitespace-nowrap cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onDelete(report.comment_id, report.id) }}
            >
              Xóa comment
            </button>
          </div>
        )}
      </div>
    )
  })
}
