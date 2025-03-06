import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(""); // Thêm state cho comment mới

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));

        axios.get(`http://localhost:8080/api/comments/post/${id}`) // Lấy comment theo post id
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [id]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; // Không gửi nếu comment rỗng

        try {
            const response = await axios.post("http://localhost:8080/api/comments", {
              post: { id: id }, 
              user: { id: 4 },  
              commentContent: newComment, 
            });

            setComments([...comments, response.data]); // Thêm comment vào danh sách
            setNewComment(""); // Reset input
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.postContent}</p>

            <h3>Bình luận</h3>
            <ul>
                {Array.isArray(comments) ? comments.map(comment => (
                    <li key={comment.id}>{comment.commentContent}</li> // ✅ Đúng key commentContent
                )) : <p>Không có bình luận nào.</p>}
            </ul>

            {/* Form nhập bình luận */}
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