import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import WikiLayout from "../../Layouts/WikiLayout"
import AvatarUpload from "./AvatarUpload"
import { getImgPublic } from "../../Utils/getImagePath"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { toast } from 'react-toastify'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState(null)

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isEditMode, setIsEditMode] = useState(false)

  const [originalData, setOriginalData] = useState({ name: "", email: "", avatar: null })

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((res) => {
        const user = res.data.data
        setUser(user)
        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar || null)
        setOriginalData({ name: user.name, email: user.email, avatar: user.avatar || null })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  console.log(avatar);

  const handleSave = async (e) => {
  e.preventDefault()
    setError(null)
    setSuccess(null)
  
    if (showPasswordForm) {
      if (newPassword !== confirmPassword) {
        setError("Mật khẩu mới và xác nhận không khớp!")
        toast.error("Mật khẩu mới và xác nhận không khớp!")
        return
      }
      if (!password || !newPassword) {
        setError("Vui lòng nhập đủ thông tin mật khẩu!")
        toast.error("Vui lòng nhập đủ thông tin mật khẩu!")
        return
      }
    }
  
    setSaving(true)
    console.log(avatar);
  
    const formData = new FormData()
    formData.append("name", name)



    if (avatar instanceof Object && avatar.name && avatar.size && avatar.type) {
      formData.append("avatar", avatar)
    }
    console.log(avatar);
    if (showPasswordForm) {
      formData.append("password", password)
      formData.append("new_password", newPassword)
      formData.append("confirm_password", confirmPassword)
    }
    formData.append('_method', 'put')
  
    router.post(route("profile.update"), formData, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: (page) => {
        const updatedUser = page.props.auth.user 
        setUser(updatedUser)
        setSuccess("Lưu thay đổi thành công!")
        toast.success("Lưu thay đổi thành công!")
        setShowPasswordForm(false)
        setPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setOriginalData({
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar || null,
        })
        setIsEditMode(false)
      },
      onError: (errors) => {
        setError("Lỗi khi lưu thay đổi")
        toast.error("Lỗi khi lưu thay đổi")
        setLoading(false)
      },
      onFinish: () => {
        setSaving(false)
      },
    })
  }
  

  const handleCancel = () => {
    setName(originalData.name)
    setEmail(originalData.email)
    setAvatar(originalData.avatar)
    setIsEditMode(false)
    setShowPasswordForm(false)
    setPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError(null)
    setSuccess(null)
  }

  const avatarSection = (
    <div className="flex flex-col items-center">
      <AvatarUpload
        isEditMode={isEditMode}
        avatar={avatar}
        setAvatar={setAvatar}
        disabled={!isEditMode}
      />
    </div>
  )

  const nameSection = isEditMode ? (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-3 py-2 rounded bg-[#2a2a2a] border border-white/10"
    />
  ) : (
    <div className="flex items-center justify-between gap-2" title="Tên người dùng">
      <span>{name}</span>
    </div>
  )

  const passwordFormSection = isEditMode && (
    <>
      <button
        type="button"
        onClick={() => setShowPasswordForm(!showPasswordForm)}
        className="text-[#df9e52] text-md text-left cursor-pointer rounded-[5px] w-full p-2 bg-[#2a2a2a]"
      >
        {showPasswordForm ? "✕ Hủy đổi mật khẩu" : "Đổi mật khẩu"}
      </button>
  
      {showPasswordForm && (
        <div className="mt-4 space-y-3">
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#2a2a2a] border border-white/10"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#2a2a2a] border border-white/10"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#2a2a2a] border border-white/10"
          />
        </div>
      )}
    </>
  );
  
  const actionButtons = !isEditMode ? (
    <button
      type="button"
      onClick={() => setIsEditMode(true)}
      className="w-full bg-[#df9e52] text-black font-bold py-2 rounded hover:bg-[#e6ad66] transition cursor-pointer"
    >
      Chỉnh sửa
    </button>
  ) : (
    <div className="flex gap-4">
      <button
        disabled={saving}
        onClick={handleSave}
        className="flex-1 bg-[#df9e52] text-black font-bold py-2 rounded hover:bg-[#e6ad66] transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {saving ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        disabled={saving}
        className="flex-1 bg-gray-600 text-white font-bold py-2 rounded hover:bg-gray-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        Hủy thay đổi
      </button>
    </div>
  );
  

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
      <AnimatePresence>
        <motion.div
          key="user-profile"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-5 w-full h-screen"
        >
          <div className="max-w-xl h-full flex flex-col gap-10 mx-auto bg-[#1f1f1f] text-white p-6 rounded-xl shadow-lg border border-white/10 space-y-6">
            <h2 className="text-2xl text-center font-bold text-[#dec599]">Thông tin người dùng</h2>
            <p className="italic text-[.8rem] text-red-400 text-center">{user.is_blocked == 1 && 'Tài khoản trong trạng thái đã bị chặn'}</p>
            {avatarSection}

            <div className="select-none" title="Không thể chỉnh sửa">
              <label className="block mb-1 text-[#f5945c]">Email</label>
              <span className="font-bold text-[#595081]">{email}</span>
            </div>

            <div>
              <label className="block mb-1 text-[#dec599]">Tên người dùng</label>
              {nameSection}
            </div>

            <div>{passwordFormSection}</div>

            {actionButtons}
          </div>
        </motion.div>
      </AnimatePresence>
    </WikiLayout>
  )
}