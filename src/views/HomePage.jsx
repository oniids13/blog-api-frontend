import axios from "axios"
import { useEffect, useState } from "react"
import Post from "../component/Posts"


const Home = () => {

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

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

    console.log(userId)
    return (
        <>
        <div className="row p-3">
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
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
  
        </>
    )
}

export default Home