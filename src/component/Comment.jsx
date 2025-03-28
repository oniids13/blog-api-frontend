import { useState } from "react";
import axios from 'axios';
import DeleteCommentButton from "./DeleteCommentButton"


const Comment = ({ comment, onUpdate, userId}) => {

    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState(comment.content);
    const token = localStorage.getItem("token");

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {

            if (newContent.trim() !== "") {
                const response = await axios.put(
                    `http://localhost:3000/posts/comment/${comment.id}/edit`,
                    {content: newContent},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
    
                onUpdate(comment.id, newContent)
                setIsEditing(false)
            }

        } catch (err) {
            console.error("Error updating comment:", err)
        }
    }

    return(
        <div>
            {isEditing ? (
                <div className="comment">
                    <small>@{comment.author?.username}</small>
                    <br />
                    <small>{comment.createdAt.slice(0, 10)}</small>
                    <form onSubmit={handleSave}>
                    <div className="form-floating mb-3">
                        <input type="text" value={newContent} autoFocus onChange={(e) => setNewContent(e.target.value)} className="form-control" required/>
                        <label htmlFor="floatingInput">Edit Comment</label>
                    </div>
                    </form>
                </div>
            ) : (
                <div className="comment my-1">
                    <small>@{comment.author?.username}</small>
                    <br />
                    <small className="comment-date">{comment.createdAt.slice(0, 10)}</small>
                    <p className="text-primary-emphasis">{comment.content}</p>

                    {userId === String(comment.author.id) && (
                        <>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <DeleteCommentButton commentID={comment.id} />
                            <button className="btn btn-sm btn-warning" onClick={handleEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                         </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )

}

export default Comment

