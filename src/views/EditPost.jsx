import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const EditPost = () => {
    const {postId} = useParams()
    const userData = JSON.parse(localStorage.getItem("userData"))
    const [singlePost, setSinglePost] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                        "Content-Type": "application/json"
                    }
                })

                setSinglePost(response.data.post);
            } catch (err) {
                console.error(err)
            }
        }

        fetchData();
    }, [postId])

    if (!singlePost) return <p>Loading post...</p>;

    return (
        <EditPostForm post={singlePost} token={userData.token} />
    )
}







const EditPostForm = ({post, token}) => {

    const userData = JSON.parse(localStorage.getItem("userData"))
    const authorId = userData.userId
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        postId: post.id,
        title: post.title,
        content: post.content,
        authorId
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/posts/${post.id}/edit`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            navigate("/home")
        } catch (err) {
            console.error("Error updating post:", err)
        }
    }

    return (
        <>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" name="title" required onChange={handleChange} value={formData.title} />
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" name="content" required onChange={handleChange} value={formData.content} />
                    <label htmlFor="floatingInput">Content</label>
                </div>
                <button className="btn btn-success mt-3" type="submit">Save</button>
            </form>
        </>
    )
}

export default EditPost