import axios from "axios"


const PublishPostButton = ({postId, onPublish}) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = JSON.parse(localStorage.getItem("userData"))

        try {
            await axios.put(`http://localhost:3000/posts/${postId}/publish`, {}, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    "Content-type": "application/json"
                }
            })

            if(onPublish) {
                onPublish(postId)
            }
        } catch (err) {
            console.error("Failed to publish post: ", err)
        }
    }

    return (
            <button onClick={handleSubmit} className="btn btn-sm btn-success" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-post" viewBox="0 0 16 16">
                    <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                </svg>
            </button>

    )
}

export default PublishPostButton