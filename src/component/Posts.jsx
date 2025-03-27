import { useState } from "react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"



const Post = ({post}) => {
    const [comments, setComments] = useState(post.comments)
    const userId = localStorage.getItem("userId")

    const handleUpdateComment = (commentId, newContent) => {
        setComments((prevComments) => 
            prevComments.map((comment) => 
                comment.id === commentId ? {...comment, content: newContent} : comment
            )
        )
    }

    return (
        <div className="card-body post">
            <h4 className="card-title">{post.title}</h4>
            <h6 className="card-subtitle mb-2 text-body-secondary">@{post.author.username}</h6>
            <small className="card-text">{post.createdAt.slice(0, 10)}</small>
            <p className="card-text fs-5">{post.content}</p>
            <hr />
            <h6>Comments</h6>
            {comments?.length > 0 ? (
                comments.map((comment) => (
                <Comment key={comment.id} comment={comment} onUpdate={handleUpdateComment} userId={userId} />
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