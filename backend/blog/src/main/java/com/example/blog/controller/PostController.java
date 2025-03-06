package com.example.blog.controller;

import com.example.blog.model.Post;
import com.example.blog.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Cho phép CORS cho riêng API này
@RestController
@RequestMapping("/api/posts") // Định nghĩa URL gốc cho API này
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 1️⃣ API tạo bài viết (Create)
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.creatPost(post);
    }

    // 2️⃣ API lấy danh sách bài viết (Read)
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // 3️⃣ API lấy chi tiết bài viết theo ID (Read)
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // 4️⃣ API cập nhật bài viết (Update)
    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    // 5️⃣ API xóa bài viết (Delete)
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}