package com.example.blog;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.blog.repository.UserRepository;

@SpringBootApplication

public class BlogApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}



	private final UserRepository userRepository;

	public BlogApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public void run(String... args) {
		System.out.println("Tổng số user trong database: " + userRepository.count());
	}


}
