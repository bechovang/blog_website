package com.example.blog.controller;

import com.example.blog.model.Comment;
import com.example.blog.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments") // Định nghĩa URL gốc cho API này
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 1️⃣ API tạo comment (Create)
    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.creatComment(comment);
    }

    // 2️⃣ API lấy danh sách comment (Read)
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // 3️⃣ API lấy comment theo ID (Read)
    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    // 4️⃣ API cập nhật comment (Update)
    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    // 5️⃣ API xóa comment (Delete)
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

    // 6️⃣ API lấy danh sách comment theo postId
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }
}
