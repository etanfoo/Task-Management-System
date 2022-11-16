package com.redlions.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class BackendApplication {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	// @Bean
	// CommandLineRunner run(ProfileService profileService) {
	// return args -> {
	// profileService.create(new Profile(1L, "batman", "profile1@email.com",
	// "password", 1L, 1L, "aboutme", "temp".getBytes(), 25.5F));
	// profileService.create(new Profile(2L, "profile2", "profile2@email.com",
	// "password", 1L, 1L, "aboutme", "temp".getBytes(), 55.5F));
	// profileService.create(new Profile(3L, "profile3", "profile3@email.com",
	// "password", 1L, 1L, "aboutme", "temp".getBytes(), 75.5F));
	// };
	// }

}
