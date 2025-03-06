package com.example.blog.controller;

import com.example.blog.model.User;
import com.example.blog.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000") // Cho phép CORS cho riêng API này
@RestController
@RequestMapping("/api/users") // Định nghĩa URL gốc cho API user
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1️⃣ Tạo user (Create)
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.creatUser(user);
    }

    // 2️⃣ Lấy danh sách user (Read)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 3️⃣ Lấy user theo ID (Read)
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 4️⃣ Cập nhật user theo ID (Update)
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // 5️⃣ Xóa user (Delete)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
