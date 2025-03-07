package com.example.blog.controller;

import com.example.blog.model.Post;
import com.example.blog.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;


import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

    // API nhận ảnh bỏ vô file và trả về url
    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("postId") Long postId) {

        System.out.println("Received postId: " + postId); // Debug

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }

        if (postId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "postId is required"));
        }

        try {
            // Kiểm tra xem bài viết có tồn tại không
            Post post = postService.getPostById(postId);
            if (post == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Post not found"));
            }

            // Lưu file
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) uploadDirFile.mkdirs();

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File dest = new File(uploadDir + fileName);
            file.transferTo(dest);

            // Cập nhật imageUrl vào Post
            String imageUrl = "http://localhost:8080/uploads/" + fileName;
            post.setImageUrl(imageUrl);
            postService.updatePost(postId, post);

            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Could not upload file"));
        }
    }



    //load ảnh từ thư mục bất kỳ
    @RestController
    @RequestMapping("/uploads")
    public class FileController {
        @GetMapping("/{filename}")
        public ResponseEntity<Resource> getFile(@PathVariable String filename) throws MalformedURLException {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG) // Hoặc MediaType.IMAGE_JPEG
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    }




}