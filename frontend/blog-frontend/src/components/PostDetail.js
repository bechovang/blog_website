import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup, Button, Form } from "react-bootstrap";

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
        <Container className="mt-4">
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    {post.imageUrl && (
                        <Card.Img variant="top" src={post.imageUrl} alt="Post" className="mb-3" />
                    )}
                    <Card.Text>{post.postContent}</Card.Text>
                </Card.Body>
            </Card>

            <h3>Bình luận</h3>
            <ListGroup className="mb-4">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <ListGroup.Item key={comment.id} className="d-flex justify-content-between align-items-center">
                            <span>{comment.commentContent}</span>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                                Xóa
                            </Button>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>Không có bình luận nào.</ListGroup.Item>
                )}
            </ListGroup>

            <Form className="mb-4">
                <Form.Group>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Nhập bình luận của bạn..." 
                    />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={handleCommentSubmit}>
                    Gửi bình luận
                </Button>
            </Form>
        </Container>
    );
};

export default PostDetail;