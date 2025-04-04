package com.example.blog.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "blog_images"));
        return uploadResult.get("secure_url").toString(); // Trả về URL ảnh
    }

    public void deleteImage(String imageUrl) {
        try {
            String publicId = imageUrl.substring(imageUrl.lastIndexOf('/') + 1).split("\\.")[0]; // Lấy publicId từ URL
            cloudinary.uploader().destroy("blog_images/" + publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            System.err.println("Error deleting image: " + e.getMessage());
        }
    }
}