import axios from "axios"
import { useEffect, useState } from "react"
import Post from "../component/Posts"
import AddPostForm from "../component/AddPostForm"

const Home = () => {

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const name = localStorage.getItem("name")
    const username = localStorage.getItem("username")

    const [adminUsers, setAdminUsers] = useState([]);
    const [basicUsers, setBasicUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState(posts.comment)

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

  
    return (
        <>
        <div className="row p-3 home">
            <div className="col-3 user-list">
                <div className="my-3">
                    <h2>Hello! {name}</h2>
                    <h4 className="text-warning-emphasis">@{username}</h4>
                </div>
                <div className="mt-5">
                    <h4 className="border-top">Admin Users </h4>
                    <ul>
                        {adminUsers.map((user) => (
                            <li key={user.id}>@{user.username}</li>
                        ))}
                    </ul>
                    <h4 className="border-top">Users</h4>
                    <ul>
                        {basicUsers.map((user) => (
                            <li key={user.id}>@{user.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-9 posts-panel">
                <div className="row">
                    <AddPostForm  token={token}/>
                </div>
                <div className="row posts-list border-top mt-5">
                    <h2 className="text-center">Blog Posts</h2>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
  
        </>
    )
}

export default Home