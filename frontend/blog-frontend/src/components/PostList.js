import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:8080/api/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(error => console.error("Error deleting post:", error));
    };

    return (
        <div>
            <h2>Danh sách bài viết</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <button onClick={() => handleDeletePost(post.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <Link to="/create">Tạo bài viết mới</Link>
        </div>
    );
};

export default PostList;