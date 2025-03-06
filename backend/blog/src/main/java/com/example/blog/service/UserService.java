package com.example.blog.service;

import com.example.blog.model.User;
import com.example.blog.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Lấy danh sách tất cả User
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Tìm User theo ID
    public User getUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        return userRepository.findById(id).get();
    }

    // Tạo User mới vào database
    public User creatUser(User user) {
        return userRepository.save(user);
    }

    // Xóa User theo ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        if (!userRepository.existsById(id)) throw new RuntimeException("Post not found");
        updatedUser.setId(id);
        return userRepository.save(updatedUser);
    }
}