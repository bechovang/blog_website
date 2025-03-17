import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import BASE_URL from "../config"; // Import BASE_URL

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    const handleDeletePost = (id) => {
        axios.delete(`${BASE_URL}/api/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(error => console.error("Error deleting post:", error));
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg p-4">
                <Card.Title className="text-center text-primary fs-3 fw-bold">
                    📜 Danh sách bài viết
                </Card.Title>
                <ListGroup className="mt-3">
                    {posts.map(post => (
                        <ListGroup.Item key={post.id} className="d-flex justify-content-between align-items-center">
                            <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark fw-semibold">
                                {post.title}
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>
                                ❌ Xóa
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="text-center mt-4">
                    <Link to="/create">
                        <Button variant="success" size="lg">✍️ Tạo bài viết mới</Button>
                    </Link>
                </div>
            </Card>
        </Container>
    );
};

export default PostList;
