import React, { useRef, useEffect, useState } from 'react'
import { EllipsisVerticalIcon, FlagIcon, PencilIcon, TrashIcon, NoSymbolIcon } from '@heroicons/react/24/solid'
import { getImage, getImageWiki } from '../../../../../../../Utils/getImagePath'
import CommentForm from './CommentForm'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import Reply from './Reply'
import CommentMenu from './CommentMenu'
import {
  handleDeleteComment,
  handleBlockComment,
  handleReportComment
} from '@/Utils/commentActions'

function CommentItem({ auth, comment, isAdmin, openMenuID, setOpenMenuID, toggleMenu }) {
  const [isEdit, setIsEdit] = useState(false)
  const [replyingId, setReplyingId] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const commentFormRef = useRef(null)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isEdit &&
        commentFormRef.current &&
        !commentFormRef.current.contains(e.target)
      ) {
        setIsEdit(false)
      }

      if (
        openMenuID &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        toggleMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isEdit, openMenuID, toggleMenu])

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      await handleDeleteComment(id, setIsLoading)
      toggleMenu(null)
    } catch (error) {
    } finally {
      setIsLoading(false)
      toggleMenu(null)
    }
  }

  const handleBlock = async (id, commentID) => {
    setIsLoading(true)
    try {
      await handleBlockComment(id)
      await handleDeleteComment(commentID)
    } catch (error) {
    } finally {
      setIsLoading(false)
      toggleMenu(null)
    }
  }
  const handleReport = async (id, reason) => {
    setIsLoading(true)
    try {
      await handleReportComment(id, reason)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div key={comment.id} className='h-fit relative'>
      <div className='flex items-start my-1 gap-4 w-fit bg-white/5 border border-white/10 px-4 py-3 rounded-xl'>
      <img
        src={comment.user?.avatar ?? getImageWiki('user.png')}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = getImageWiki('user.png')
        }}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
        <div className='flex flex-col w-full'>
          <span className='text-[#dec599] font-semibold text-sm'>{auth.user && comment.user.id == auth?.user.id ? 'Bạn' : comment.user.name}</span>
          
          {isEdit && !auth.user.is_blocked ? (
            <CommentForm
              isEdit={isEdit}
              setisEdit={setIsEdit}
              commentId={comment.id}
              initialContent={comment.content}
              initialImage={comment.image}
              onCancel={() => setIsEdit(false)}
              ref={commentFormRef}
            />
          ) : (
            <p className='text-white text-sm whitespace-pre-line mt-1'>{comment.content}</p>
          )}

          {comment.image && !isEdit && (
            <img
              src={getImage(comment.image)}
              alt='Comment'
              className='w-40 mt-2 rounded-lg border border-white/10'
            />
          )}
          {!isEdit && (
           <Reply
              comment={comment}
              replyingId={replyingId}
              setReplyingId={setReplyingId}
              auth={auth}
              isAdmin={isAdmin}
              openMenuID={openMenuID}
              setOpenMenuID={setOpenMenuID}
              toggleMenu={toggleMenu}
              isEdit={isEdit}
            />
          )}
          {showLoginModal && (
            <motion.div
            className='fixed bg-opacity-50 h-fit w-auto z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-[#1f1f1f] w-50 h-auto p-2 rounded-[5px] text-left shadow-lg flex-col flex '
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <h2 className='text-[.7rem] whitespace-break-spaces text-center font-semibold  text-white mb-3'>
                Bạn cần đăng nhập để báo cáo bình luận
              </h2>
              <Link
                href='/login'
                className='bg-[#e5984d] text-white text-sm p-1 rounded hover:bg-[#f2a55b] transition w-full cursor-pointer text-center'
              >
                Đăng nhập
              </Link>
              <button
                onClick={() => setShowLoginModal(false)}
                className='mt-3 block text-[#dec599] hover:text-white transition w-full text-center text-sm cursor-pointer'
              >
                Huỷ
              </button>
            </motion.div>
          </motion.div>
          )}
        </div>
     
        {/* Menu ba chấm */}
        <div className='relative'>
          <button
            ref={buttonRef}
            onClick={() => toggleMenu(openMenuID ? null : comment.id)}
            className='text-white hover:text-[#dec599] p-1 cursor-pointer'
          >
            <EllipsisVerticalIcon className='w-5 h-5' />
          </button>

          {openMenuID === comment.id && (
              <div
                ref={menuRef}
                className='absolute z-10 mt-1 right-0 bg-[#1f1f1f] border border-white/10 rounded shadow-lg w-44'
              >
                
                <CommentMenu
                  comment={comment}
                  auth={auth}
                  isAdmin={isAdmin}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleDelete={handleDelete}
                  handleBlock={handleBlock}
                  handleReport={handleReport}
                  toggleMenu={toggleMenu}
                  isEdit= {isEdit}
                  setIsEdit={setIsEdit}
                  setShowLoginModal={setShowLoginModal}
                />
              </div>
            )}
            
          
        </div>
        
      </div>
     
    </div>
  )
}

export default CommentItem
