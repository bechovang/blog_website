package com.example.blog.controller;

import com.example.blog.model.Post;
import com.example.blog.service.CloudinaryService;
import com.example.blog.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;


import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000") // Cho phép CORS cho riêng API này
@CrossOrigin(origins = "https://blog-website-frontend-shku.onrender.com")

@RestController
@RequestMapping("/api/posts") // Định nghĩa URL gốc cho API này
public class PostController {

    private final PostService postService;
    private final CloudinaryService cloudinaryService;

    public PostController(PostService postService, CloudinaryService cloudinaryService) {
        this.postService = postService;
        this.cloudinaryService = cloudinaryService;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        // Xóa ảnh trên Cloudinary nếu có
        if (post.getImageUrl() != null && !post.getImageUrl().isEmpty()) {
            cloudinaryService.deleteImage(post.getImageUrl());
        }

        // Xóa bài viết từ database
        postService.deletePost(id);

        return ResponseEntity.ok("Post deleted successfully");
    }


    // API nhận ảnh up lên cloud và trả về url
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("postId") Long postId) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }

        Post post = postService.getPostById(postId);
        if (post == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Post not found"));
        }

        try {
            String imageUrl = cloudinaryService.uploadImage(file);
            post.setImageUrl(imageUrl);
            postService.updatePost(postId, post);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Could not upload file"));
        }
    }




}