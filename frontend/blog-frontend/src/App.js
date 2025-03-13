import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";

function App() {
  useEffect(() => {
    const checkAndCreateUsers = async () => {
      try {
        await axios.post("http://localhost:8080/api/users/check-and-create");
        console.log("Đã kiểm tra và tạo user nếu cần.");
      } catch (error) {
        console.error("Lỗi khi kiểm tra/tạo user:", error);
      }
    };

    checkAndCreateUsers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
