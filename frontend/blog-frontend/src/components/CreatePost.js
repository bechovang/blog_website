import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const newPost = {
        title,
        postContent: content, // cho `postContent` nhận `content`
        author: { id: 4 } 
      };
    
      console.log("Gửi dữ liệu:", newPost); // Kiểm tra dữ liệu trước khi gửi
    
      axios.post("http://localhost:8080/api/posts", newPost)
        .then(() => navigate("/"))
        .catch(error => console.error("Error creating post:", error.response));
    };
  
    return (
      <div>
        <h2>Tạo bài viết mới</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tiêu đề:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Nội dung:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <button type="submit">Đăng bài</button>
        </form>
      </div>
    );
  };
  
  export default CreatePost;