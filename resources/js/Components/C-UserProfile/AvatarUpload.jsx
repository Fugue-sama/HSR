import React, { useRef, useState } from 'react'
import { getImage } from '../../Utils/getImagePath'

export default function AvatarUpload({isEditMode, setAvatar, avatar }) {
  const [avatarPreview, setAvatarPreview] = useState(avatar ?? null)
  const inputFileRef = useRef(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
      console.log(avatar, avatarPreview);
    }
    else {
      setAvatarPreview(getImage(avatar))
    }
  }

  const handleClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <div className={`relative w-24 h-24 rounded-full overflow-hidden group ${isEditMode ? 'cursor-pointer' : 'select-none pointer-events-none' }`} onClick={isEditMode ? handleClick : undefined}>
      <img
        src={ avatarPreview || "https://placehold.co/100x100?text=Avatar"}
        alt="Avatar"
        className="w-24 h-24 object-cover border border-white/20 rounded-full"
      />
      <div className="absolute inset-0 bg-black  flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3-3m0 0l3 3m-3-3v12" />
          <rect width="18" height="14" x="3" y="7" rx="2" ry="2" />
        </svg>
      </div>
      {/* input file ẩn */}
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        ref={inputFileRef}
        className="hidden"
      />
    </div>
  )
}
