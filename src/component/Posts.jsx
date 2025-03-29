import { useState } from "react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import DeletePostButton from "./DeletePostButton"
import EditPostButton from "./EditPostButton"

const Post = ({post}) => {
    const [comments, setComments] = useState(post.comments)
    const userData = JSON.parse(localStorage.getItem("userData"))

    const handleUpdateComment = (commentId, newContent) => {
        setComments((prevComments) => 
            prevComments.map((comment) => 
                comment.id === commentId ? {...comment, content: newContent} : comment
            )
        )
    }

    return (
        <div className="card-body post">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <h4 className="card-title">{post.title}</h4>
                {userData.userId === post.author.id &&
                    <>
                    <EditPostButton postId={post.id} />
                    <DeletePostButton postId={post.id} />
                    </>
                }
            </div>
            
            <h6 className="card-subtitle mb-2 text-body-secondary">@{post.author.username}</h6>
            <small className="card-text">{post.createdAt.slice(0, 10)}</small>
            <p className="card-text fs-5">{post.content}</p>
            <hr />
            <h6>Comments</h6>
            {comments?.length > 0 ? (
                comments.map((comment) => (
                <Comment key={comment.id} comment={comment} onUpdate={handleUpdateComment} userId={userData.userId} />
            ))
            ) : (
            <p>No comments yet</p>
            )}
            <div>
                <CommentForm postId={post.id} />
            </div>
        </div>
    )
}


export default Post