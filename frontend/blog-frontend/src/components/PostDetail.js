import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));

        axios.get(`http://localhost:8080/api/comments/post/${id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [id]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post("http://localhost:8080/api/comments", {
                post: { id: id },
                user: { id: 4 },
                commentContent: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>{post.title}</h2>

            {/* Hiển thị ảnh nếu có */}
            {post.imageUrl && (
                <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }} 
                />
            )}

            <p>{post.postContent}</p>

            <h3>Bình luận</h3>
            <ul>
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(comment => (
                        <li key={comment.id}>{comment.commentContent}</li>
                    ))
                ) : (
                    <p>Không có bình luận nào.</p>
                )}
            </ul>

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
