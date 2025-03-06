package com.example.blog.service;

import com.example.blog.model.Comment;
import com.example.blog.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Lấy danh sách bình luận
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // Tìm bình luận theo ID
    public Comment getCommentById(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found");
        }
        return commentRepository.findById(id).get();
    }

    // tạo bình luận mới
    public Comment creatComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    // Xóa bình luận theo ID
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    //Cập nhật Comment theo ID (update)
    public Comment updateComment(Long id, Comment updatedComment) {
        if (!commentRepository.existsById(id)) throw new RuntimeException("Comment not found");
        updatedComment.setId(id);
        return commentRepository.save(updatedComment);
    }

    // lấy commnet theo post id
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}