import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import axios from 'axios'

export const handleDeleteComment = async (id) => {
  try {
    await router.delete(route('comments.destroy', id))
  } catch {
    toast.error('Xoá thất bại, thử lại sau')
  }
}

export const handleBlockComment = async (id) => {
  console.log(id)
  try {
    await axios.post(route('users.block', id))
    toast.success('Đã chặn người dùng !')
  } catch {
    toast.error('Chặn thất bại, thử lại sau')
  }
}
  
export const handleReportComment = async (id, reason) => {
  try {
    const res = await axios.post(route('reports.store'), {
      comment_id: id,
      reason: reason,
    });

    if (res.data.message === 'duplicate') {
      toast.info('Bình luận này đã được báo cáo trước đó.');
    } else {
      toast.success('Báo cáo thành công!');
    }
  } catch (error) {
    toast.error('Có lỗi xảy ra khi báo cáo.');
  }
}
