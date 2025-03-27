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
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" name="content" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" id="floatingInput" required/>
                    <label htmlFor="floatingInput">Add Comment</label>
                </div>
            </form>
        </div>
    )
}

export default CommentForm