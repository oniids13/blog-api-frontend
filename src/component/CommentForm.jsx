import axios from "axios"
import { useState } from "react"


const CommentForm = ({postId}) => {
    const [comment, setComment] = useState("")

    const handleSubmit = async () => {

        try {
            const token = localStorage.getItem("token")

            const response = await axios.post(
                `http://localhost:3000/posts/${postId}/comment`,
                { content: comment},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            console.log(response.data)
            setComment("")
        } catch (err) {
            console.error("Error adding comment:", err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="content" placeholder="Add Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
            <br />
            <button type="submit" className="btn btn-sm btn-success">Add Comment</button>
        </form>
    )
}

export default CommentForm