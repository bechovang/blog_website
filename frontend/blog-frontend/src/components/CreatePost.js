import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import BASE_URL from "../../config"; // Import BASE_URL

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
            const postRes = await axios.post(`${BASE_URL}/api/posts`, {
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

                await axios.post(`${BASE_URL}/api/posts/upload`, formData, {
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
        <Container className="mt-4">
            <Card className="p-4">
                <h2 className="text-center mb-4">Tạo bài viết mới</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            placeholder="Nhập tiêu đề bài viết"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                            placeholder="Nhập nội dung bài viết"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh bài viết</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Đăng bài
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default CreatePost;
