import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { getImage } from '../../../../../../../Utils/getImagePath'
import { route } from 'ziggy-js'

function CommentForm({
    characterId,
    initialContent = '',
    initialImage = null,
    isEdit = false,
    setisEdit = false,
    commentId = null,
    onCancel = null,
    parentId = null,
}) {
    const [content, setContent] = useState(initialContent)
    const [image, setImage] = useState(initialImage)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const inputId = `file-upload-${parentId ?? 'main'}`

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        if (!content.trim() && !image) {
            setError('Vui lòng nhập nội dung hoặc chọn ảnh.')
            setIsSubmitting(false)
            return
        }
        
        const formData = new FormData()
        formData.append('content', content)
        if (parentId) formData.append('parent_id', parentId)
        if (image) formData.append('image', image)
        if (characterId) formData.append('character_id', characterId)

        // Phân biệt create hoặc edit
        if (isEdit && commentId) {
            formData.append('_method', 'put')
            router.post(route('comments.update', commentId ), 
                formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setisEdit(!isEdit)
                },
                onFinish: () => setIsSubmitting(false),
            })
        } else {
            router.post('/comments', formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setContent('')
                    setImage(null)
                },
                onFinish: () => setIsSubmitting(false),
            })
        }
    }

    const handleRemoveImage = () => setImage(null)

    return (
        <form onSubmit={handleSubmit} className='space-y-4'  >
            <textarea
                value={content ?? ''}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
                placeholder='Viết bình luận...'
                className='w-full p-3 rounded bg-[rgba(255,255,255,0.05)] border border-white/20 text-[#f1f1f1] placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#dec599] transition'
                disabled={isSubmitting}
            />

            <div className='flex items-center space-x-4'>
                {image  ? (
                    <div className='relative mt-2 inline-block'>
                        <img
                            src={
                                typeof image === 'object' &&
                                image instanceof Blob
                                    ? URL.createObjectURL(image)
                                    : getImage(image)
                            }
                            alt='Ảnh xem trước'
                            className='w-40 rounded-lg border border-white/10'
                        />
                        {(!isEdit || (image instanceof Blob)) && (
                            <button
                                type='button'
                                onClick={handleRemoveImage}
                                className='absolute top-0 right-0 bg-black/50 text-white p-1 rounded-full hover:bg-red-600 transition'
                            >
                                <XMarkIcon className='h-4 w-4' />
                            </button>
                        )}
                    </div>
                ) : (
                    !isEdit && (
                        <>
                        <label
                            htmlFor={inputId}
                            className='cursor-pointer inline-flex items-center space-x-2 text-[#dec599] hover:text-[#e9d6a9] transition'
                        >
                            <PhotoIcon className='h-6 w-6' />
                            <span className='text-sm'>Tải ảnh</span>
                        </label>
                        <input
                            id={inputId}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => setImage(e.target.files[0])}
                            disabled={isSubmitting}
                        />  
                        {error && (
                            <p className='text-red-500 text-sm mt-1'>{error}</p>
                        )}
                    </>
                    )
                )}
            </div>

            <div className='flex gap-2'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`flex items-center justify-center gap-2 bg-[#282828] text-[#dec599] hover:text-[#db963e] font-bold px-4 py-2 rounded transition cursor-pointer ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting && (
                        <motion.div className='h-4 w-4  rounded-full border-2 border-t-transparent border-black animate-spin' />
                    )}
                    {isSubmitting
                        ? 'Đang gửi...'
                        : isEdit
                        ? 'Lưu chỉnh sửa'
                        : 'Gửi bình luận'}
                </button>
                {isEdit && onCancel && (
                    <button
                        type='button'
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className='bg-[#282828] text-[#dec599] hover:text-[#db963e] font-bold px-4 py-2 rounded transition cursor-pointer'
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    )
}

export default CommentForm
