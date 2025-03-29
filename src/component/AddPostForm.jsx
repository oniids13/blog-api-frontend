import { useState } from "react"
import axios from 'axios'




const AddPostForm = ({token}) => {

    const [alertMessage, setAlertMessage] = useState("");
    const [formData, setFormData] = useState({
            title: "",
            content: "",
     
        })
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }

        const handleSubmit = async () => {
            try {
                const response = await axios.post(`http://localhost:3000/posts/post`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })   

                setAlertMessage("Post is pending for approval!");
            }  catch (err) {
                setAlertMessage("Error adding post.");
                console.error("Error updating post:", err)
        }
        }


    return (
        <>
        {alertMessage && (
                <div className="alert alert-info">{alertMessage}</div> 
            )}
        <form onSubmit={handleSubmit}>
                 <div className="form-floating mb-3">
                    <input value={formData.title} onChange={handleChange} type="text" name="title" className="form-control add-post-input" id="floatingInput" required/>
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea value={formData.content} onChange={handleChange} name="content" cols={100} rows={10}></textarea>
                </div>
                <button className="btn btn-sm btn-success" type="submit">Post</button>
        </form>
        </>
    )
}

export default AddPostForm