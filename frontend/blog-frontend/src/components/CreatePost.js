import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Tạo bài viết trước
            const postRes = await axios.post("http://localhost:8080/api/posts", {
                title,
                postContent: content,
                author: { id: 1 },
                imageUrl: "" // Để trống ban đầu
            });

            const postId = postRes.data.id; // Lấy ID bài viết mới

            // 2️⃣ Nếu có ảnh, upload ảnh kèm postId
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("postId", postId); // Gửi postId lên server

                await axios.post("http://localhost:8080/api/posts/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            // 3️⃣ Chuyển hướng sau khi hoàn tất
            navigate("/");
        } catch (error) {
            console.error("Lỗi tạo bài viết:", error);
        }
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
                <div>
                    <label>Ảnh:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit">Đăng bài</button>
            </form>
        </div>
    );
};

export default CreatePost;
