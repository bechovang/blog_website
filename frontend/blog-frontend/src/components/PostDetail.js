import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams(); // Lấy ID bài viết từ URL
    const [post, setPost] = useState(null); // Lưu thông tin bài viết
    const [comments, setComments] = useState([]); // Lưu danh sách bình luận
    const [newComment, setNewComment] = useState(""); // Lưu nội dung bình luận mới

    useEffect(() => {
        // Fetch thông tin bài viết từ API
        axios.get(`http://localhost:8080/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));

        // Fetch danh sách bình luận từ API
        axios.get(`http://localhost:8080/api/comments/post/${id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [id]);

    // Xử lý gửi bình luận mới
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; // Kiểm tra nếu nội dung rỗng thì không gửi

        try {
            const response = await axios.post("http://localhost:8080/api/comments", {
                post: { id: id }, // Gửi kèm ID bài viết
                user: { id: 1 }, // Giả sử user có ID = 1 (cần thay thế bằng dữ liệu thực)
                commentContent: newComment, // Nội dung bình luận
            });

            setComments([...comments, response.data]); // Cập nhật danh sách bình luận
            setNewComment(""); // Reset ô nhập bình luận
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    // Xử lý xóa bình luận
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId)); // Xóa bình luận khỏi danh sách
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Hiển thị loading nếu bài viết chưa được load
    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>{post.title}</h2>

            {/* Hiển thị ảnh nếu bài viết có hình ảnh */}
            {post.imageUrl && (
                <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }} 
                />
            )}

            <p>{post.postContent}</p>

            {/* Hiển thị danh sách bình luận */}
            <h3>Bình luận</h3>
            <ul>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <li key={comment.id}>
                            {comment.commentContent}
                            <button onClick={() => handleDeleteComment(comment.id)}>Xóa</button>
                        </li>
                    ))
                ) : (
                    <p>Không có bình luận nào.</p>
                )}
            </ul>

            {/* Ô nhập bình luận mới */}
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Nhập bình luận của bạn..."
                />
                <button onClick={handleCommentSubmit}>Gửi</button>
            </div>
        </div>
    );
};

export default PostDetail;
