import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import WikiLayout from '../../../Layouts/WikiLayout'
import { ReportList } from './ReportList'
import { toast } from 'react-toastify'
import { route } from 'ziggy-js'
import '~css/login-register-form.css'
import { router } from '@inertiajs/react'
import { getImgPublic } from '../../../Utils/getImagePath'

const AdminReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/reports')
      .then(res => {
        setReports(res.data)
      })
      .catch(() => {
        toast.error('Lỗi khi tải dữ liệu báo cáo')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSkip = async (reportId) => {
    try {
      await axios.delete(route('reports.destroy', reportId))
      setReports(prev => prev.filter(r => r.id !== reportId))
      toast.success('Đã bỏ qua báo cáo thành công')
    } catch (error) {
      toast.error('Lỗi khi bỏ qua báo cáo')
    }
  }

  const handleBlock = async (userId, commentId, reportId) => {
    try {
      await axios.post(`/api/users/${userId}/block`)
      await axios.delete(route('reports.destroy', reportId))
      await router.delete(route('comments.destroy', commentId))
      setReports(prev => prev.filter(r => r.id !== reportId))
      toast.success('Đã chặn user và xóa comment thành công')
    } catch (error) {
      toast.error('Lỗi khi chặn user hoặc xóa comment')
    }
  }

  const handleDelete = async (commentId, reportId) => {
    try {
      await axios.delete(route('reports.destroy', reportId))
      await router.delete(route('comments.destroy', commentId))
      setReports(prev => prev.filter(r => r.id !== reportId))
      toast.success('Đã xóa comment thành công')
    } catch (error) {
      toast.error('Lỗi khi xóa comment hoặc báo cáo')
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1d1d]">
        <img
          src={getImgPublic("logo-web.webp")}
          alt="Loading..."
          className="w-20 h-20 animate-pulse"
        />
      </div>
    )
  }

  return (
    <WikiLayout>
     <div className="w-[50%] h-screen mx-auto text-white p-6 px-10" >
        <h2 className="text-2xl font-bold mb-6 text-center">Quản lý báo cáo bình luận</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-auto customScroll max-h-[70vh] p-5">
              <ReportList 
                reports={reports}
                onSkip={handleSkip}
                onBlock={handleBlock}
                onDelete={handleDelete}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </WikiLayout>
  )
}

export default AdminReports
