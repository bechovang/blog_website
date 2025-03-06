package com.example.blog.service;

import com.example.blog.model.Post;
import com.example.blog.model.User;
import com.example.blog.repository.PostRepository;
import com.example.blog.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // Lấy danh sách bài viết
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Tìm bài viết theo ID
    public Post getPostById(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found");
        }
        return postRepository.findById(id).get();
    }


    // 1Tạo bài viết (Create) - Không dùng Optional
    public Post creatPost(Post post) {
        if (post.getAuthor() == null || post.getAuthor().getId() == null) {
            throw new RuntimeException("Author ID is required");
        }

        User author = userRepository.findById(post.getAuthor().getId()).orElse(null);
        if (author == null) {
            throw new RuntimeException("User not found");
        }

        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    // Xóa bài viết theo ID
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // Cập nhật bài viết theo ID (update)
    public Post updatePost(Long id, Post updatedPost) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found");
        }

        // 🔹 Lấy bài viết cũ từ DB
        Post existingPost = postRepository.findById(id).get();

        // 🔹 Cập nhật dữ liệu mới nhưng giữ nguyên `createdAt`
        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setPostContent(updatedPost.getPostContent());
        existingPost.setCreatedAt(existingPost.getCreatedAt()); // Giữ nguyên thời gian tạo

        // 🔹 Kiểm tra và cập nhật tác giả (bắt buộc phải có)
        if (updatedPost.getAuthor() == null || updatedPost.getAuthor().getId() == null) {
            throw new RuntimeException("Author ID is required");
        }
        existingPost.setAuthor(updatedPost.getAuthor());

        return postRepository.save(existingPost);
    }



}