import axios from "axios"



const DeleteButton = ({commentID}) => {

    

    const handleSubmit = async () => {
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`http://localhost:3000/posts/comment/${commentID}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        } catch (err) {
            console.error("Failed deleting comment: ", err)
        }
    }


    return (
        <button type="submit" onClick={handleSubmit}>Delete Comment</button>
    )
}

export default DeleteButton