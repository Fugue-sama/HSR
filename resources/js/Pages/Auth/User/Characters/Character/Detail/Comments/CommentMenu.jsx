import React, { useState } from 'react'
import { FlagIcon, PencilIcon, TrashIcon, NoSymbolIcon } from '@heroicons/react/24/solid'
function CommentMenu(
{ comment,
  auth,
  isAdmin,
  isLoading,
  setIsLoading,
  handleDelete,
  handleBlock,
  handleReport,
  toggleMenu,
  isEdit,
  setIsEdit,
  setShowLoginModal}) 
  {
    const renderMenuButtons = () => {
      const isOwner = comment?.user.id === auth?.user?.id
      const [showReasonDropdown, setShowReasonDropdown] = useState(false)
      const reportReasons = [
        'Nội dung xúc phạm',
        'Spam hoặc quảng cáo',
        'Nội dung không phù hợp',
        'Khác'
      ]
      
      
      return (
        <>
          {/* Admin & không phải chủ comment */}
          {isAdmin && !isOwner && (
            <>
              <button
                onClick={() => handleDelete(comment.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 w-full text-left p-2 bg-[#282828] text-[#dec599] hover:text-[#e5984d] cursor-pointer rounded transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <TrashIcon className='w-4 h-4' />
                {isLoading ? 'Đang xử lý...' : 'Xoá bình luận'}
              </button>
  
              <button
                onClick={() => handleBlock(comment.user.id, comment.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 w-full text-left p-2 bg-[#282828] text-[#dec599] hover:text-[#e5984d] cursor-pointer rounded transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <NoSymbolIcon className='w-4 h-4' />
                {isLoading ? 'Đang xử lý...' : 'Chặn'}
              </button>
            </>
          )}
    
          {/* Người dùng thường (không phải admin & không phải chủ) */}
          {!isAdmin && !isOwner && (
            <div className="relative">
              <button
                onClick={() => {
                  if (!auth?.user) {
                    setShowLoginModal(true)
                    return
                  }
                  setShowReasonDropdown((prev) => !prev)
                }}
                disabled={isLoading}
                className={`flex items-center gap-2 w-full text-left p-2 bg-[#282828] text-[#dec599] hover:text-[#e5984d] cursor-pointer rounded transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FlagIcon className="w-4 h-4" />
                {isLoading ? 'Đang xử lý...' : 'Báo cáo'}
              </button>

              {showReasonDropdown && (
                <div className="absolute z-20 mt-2 bg-[#1f1f1f] border border-white/10 rounded shadow-lg w-60">
                  {reportReasons.map((reason, index) => (
                    <button
                      key={index}
                      onClick={async () => {
                        setIsLoading(true)
                        try {
                          await handleReport(comment.id, reason)
                        } catch (e) {
                          console.error(e)
                        } finally {
                          setIsLoading(false)
                          setShowReasonDropdown(false)
                          toggleMenu(null)
                        }
                      }}
                      className="block w-full text-left text-sm text-white hover:bg-[#2c2c2c] px-4 py-2 transition"
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
    
          {/* Chủ comment */}
          {isOwner && (
            <>
             <button
                onClick={() => handleDelete(comment.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 w-full text-left p-2 bg-[#282828] text-[#dec599] hover:text-[#e5984d] cursor-pointer rounded transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <TrashIcon className='w-4 h-4' />
                {isLoading ? 'Đang xử lý...' : 'Xoá bình luận'}
              </button>
  
    
              <button
                onClick={() => {
                  setIsEdit(!isEdit)
                  toggleMenu(null)
                }}
                className='flex items-center gap-2 w-full text-left p-2 bg-[#282828] text-[#dec599] hover:text-[#e5984d] cursor-pointer rounded transition'
              >
                <PencilIcon className='w-4 h-4' />
                Chỉnh sửa
              </button>
            </>
          )}
         
        </>
      )
    }
    return (
      <div className="flex flex-col p-1">
        {renderMenuButtons()}
      </div>
    )
}

export default CommentMenu