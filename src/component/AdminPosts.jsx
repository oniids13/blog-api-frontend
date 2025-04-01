import DeletePostButton from "./DeletePostButton"
import PublishPostButton from "./PublishPostButton"

const AdminPosts = ({post, setAllPosts}) => {

    const userData = JSON.parse(localStorage.getItem("userData"))

    const handlePostPublished = (postId) => {
        setAllPosts(prevState => ({
            unpublished: prevState.unpublished.filter(post => post.id !== postId),
            published: [...prevState.published, prevState.unpublished.find(post => post.id === postId)]
        }))
    }

    return (
        <div className="card-body post mt-3">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <h4 className="card-title">{post.title}</h4>
                {userData.role === "ADMIN" &&
                    <>
                    <DeletePostButton postId={post.id} />
                    </>
                }
                {(userData.role === "ADMIN" && post.published === false) &&
                    <>
                    <PublishPostButton postId={post.id} onPublish={handlePostPublished} />
                    </>
                }
            </div>
            
            <h6 className="card-subtitle mb-2 text-body-secondary">@{post.author.username}</h6>
            <small className="card-text">{post.createdAt.slice(0, 10)}</small>
            <p className="card-text fs-5">{post.content}</p>
        </div>
    )
}

export default AdminPosts