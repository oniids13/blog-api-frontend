import axios from "axios"
import { useEffect, useState } from "react"
import CommentForm from "../component/CommentForm"
import DeleteButton from "../component/DeleteButton"


const Home = () => {

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    const [adminUsers, setAdminUsers] = useState([]);
    const [basicUsers, setBasicUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        let isMounted = true
        const fetchData = async () => {
            try {
                const [userResponse, postsResponse] = await Promise.all([
                    axios.get("http://localhost:3000/user/all", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }),
                    axios.get("http://localhost:3000/posts", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })
                ]) 
                if (isMounted) {
                    setAdminUsers(userResponse.data.adminUsers)
                    setBasicUsers(userResponse.data.basicUsers)
                    setPosts(postsResponse.data.publishedPosts)
                    console.log(userResponse.data, postsResponse.data.publishedPosts)
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch data");
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false
        }
    }, [])

    console.log(userId)
    return (
        <>
        <div className="posts row">
            <div className="col-3 user-list">
                <h4>Admin Users </h4>
                <ul>
                    {adminUsers.map((user) => (
                        <li key={user.id}>@{user.username}</li>
                    ))}
                </ul>
                <h4>Users</h4>
                <ul>
                    {basicUsers.map((user) => (
                        <li key={user.id}>@{user.username}</li>
                    ))}
                </ul>
            </div>
            <div className="col-9 posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="card" style={{width: 50 + 'rem'}}>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">@{post.author.username}</h6>
                      <small className="card-text">{post.createdAt.slice(0, 10)}</small>
                      <p className="card-text">{post.content}</p>
                      <hr />
                      <h6>Comments</h6>
                      {post.comments?.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <small>@{comment.author?.username}</small>
                                <br />
                                <small>{comment.createdAt.slice(0, 10)}</small>
                                <p>{comment.content}</p>
                                {userId === comment.author.id ? (
                                    <DeleteButton commentID={comment.id} />
                                ): null}
                            </div>
                        ))
                        ) : (
                        <p>No comments yet</p>
                        )}
                        <div>
                           <CommentForm postId={post.id} />
                        </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
  
        </>
    )
}

export default Home