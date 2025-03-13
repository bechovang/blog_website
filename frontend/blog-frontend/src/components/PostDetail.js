import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);

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
                user: { id: 1 },
                commentContent: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>{post.title}</h2>

            {/* Hiển thị ảnh thu nhỏ */}
            {post.imageUrl && (
                <div className="image-container text-center">
                    <Zoom>
                        <img
                            src={post.imageUrl}
                            alt="Post"
                            className="img-thumbnail"
                            style={{ maxWidth: "300px", cursor: "pointer" }}
                            onClick={() => setShowImageModal(true)}
                        />
                    </Zoom>
                </div>
            )}

            <p>{post.postContent}</p>

            {/* Danh sách bình luận */}
            <h3>Bình luận</h3>
            <ul className="list-group">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {comment.commentContent}
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>Xóa</button>
                        </li>
                    ))
                ) : (
                    <p>Không có bình luận nào.</p>
                )}
            </ul>

            {/* Ô nhập bình luận mới */}
            <div className="mt-3">
                <textarea
                    className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Nhập bình luận của bạn..."
                />
                <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>Gửi</button>
            </div>

            {/* Modal hiển thị ảnh lớn hơn */}
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
                <Modal.Body className="text-center">
                    {post.imageUrl && (
                        <Zoom>
                            <img src={post.imageUrl} alt="Expanded" className="img-fluid" />
                        </Zoom>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PostDetail;
