import React, { useState } from "react"
import CommentItem from "./CommentItem"

function CommentsContainer({ auth, character }) {
  //  chứa comment id
  const [openMenuID, setOpenMenuID] = useState(null)
  const toggleMenu = (commentID) => {
    if (openMenuID === commentID) {
      setOpenMenuID(null)
    } else {
      setOpenMenuID(commentID)
    }
  }

  return (
    <>
      {character?.comments && character.comments.length > 0 && (
        <div className={`mt-10 `}>
          <div className="space-y-6 p-5 border-t border-white/20">
            {character.comments.map((comment) => (
              <MemoizedCommentItem
                key={comment.id}
                auth={auth}
                comment={comment}
                isAdmin={auth?.user?.role.includes("admin")}
                openMenuID={openMenuID}
                setOpenMenuID={setOpenMenuID}
                toggleMenu={toggleMenu}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const MemoizedCommentItem = React.memo(CommentItem)

export default CommentsContainer
