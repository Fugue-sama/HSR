// Reply.jsx
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

export default function Reply({
  comment,
  replyingId,
  setReplyingId,
  auth,
  isAdmin,
  openMenuID,
  setOpenMenuID,
  toggleMenu,
  isEdit,
}) {
  if (isEdit) return null

  return (
    <>
      <button
        onClick={() => setReplyingId(replyingId === comment.id ? null : comment.id)}
        className='text-[.8rem] cursor-pointer text-left text-[#dec599] hover:text-[#e5984d] mt-2'
      >
        {replyingId === comment.id ? 'Hủy trả lời' : 'Trả lời'}
      </button>

      {replyingId === comment.id && (
        <div className='mt-2'>
          <CommentForm
            key={`reply-form-${comment.id}`}
            characterId={comment.character_id}
            parentId={comment.id}
            onCancel={() => setReplyingId(null)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className='ml-14 mt-2 space-y-2'>
          {comment.replies.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              auth={auth}
              isAdmin={isAdmin}
              openMenuID={openMenuID}
              setOpenMenuID={setOpenMenuID}
              toggleMenu={toggleMenu}
            />
          ))}
        </div>
      )}
    </>
  )
}
