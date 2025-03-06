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

    
  
    return (
      <div>
        <h2>Danh sách bài viết</h2>
        <ul>
          {posts.map(post => {
            console.log("post nhận được:", post); //debug
            return (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>

        <Link to="/create">Tạo bài viết mới</Link>
      </div>
    );
  };
  
  export default PostList;