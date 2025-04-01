import axios from "axios";
import { useEffect, useState } from "react"
import AdminPosts from "../component/AdminPosts";
import DeleteUserButton from "../component/DeleteUserButton";

const AdminPage = () => {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const [category, setCategory] = useState("unpublished")

    const [basicUsers, setBasicUsers] = useState([]);

    const [allPosts, setAllPosts] = useState({ unpublished: [], published: [] });


    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try {
                const [userResponse, postsResponse] = await Promise.all([

                    axios.get("http://localhost:3000/user/all", {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                            "Content-Type": "application/json"
                        }
                    }),
                    axios.get("http://localhost:3000/posts", {
                        headers : {
                            Authorization: `Bearer ${userData.token}`,
                            "Content-Type": "application/json"
                        }
                    })
                ]) 
                if (isMounted) {

                    setBasicUsers(userResponse.data.basicUsers)
                    setAllPosts({
                        unpublished: postsResponse.data.unpublishedPosts || [],
                        published: postsResponse.data.publishedPosts || [],
                    });
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed fetching posts: ", err)
                }
            }

        }
        fetchData();

        return () => {
            isMounted = false
        }
    }, [])

        const displayedPosts = allPosts[category] || [];
    return(
        <>
        <h1 className="m-3">Admin Page</h1>
        <div className="row admin-page">
            <div className="col-3">
                <h2>Manage Users</h2>
                <ul>
                        {basicUsers.map((user) => (
                            <li key={user.id}>@{user.username} <DeleteUserButton userId={user.id} /></li>
                        ))}
                    </ul>
            </div>
            <div className="col-9">
                <h2>Manage Posts</h2>
                <div>
                    <form>
                        <select className="form-select" aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="unpublished">Unpublished Posts</option>
                            <option value="published">Published Posts</option>
                        </select>
                    </form>
                </div>
                <div>
                    <h3 className="my-3">{category === "unpublished" ? "Unpublished Posts" : "Published Posts"}</h3>
                    {displayedPosts.length > 0 ? (
                        displayedPosts.map((post) => <AdminPosts key={post.id} post={post} setAllPosts={setAllPosts} />)
                    ) : (
                        <p>No {category} found.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}


export default AdminPage