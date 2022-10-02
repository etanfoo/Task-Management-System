package com.redlions.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.service.ProfileService;

@SpringBootApplication
public class BackendApplication {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ProfileService profileService) {
		return args -> {
			profileService.saveProfile(new Profile(1L, "profile1", "profile1@email.com", "password", 1L, 1L, "temp".getBytes()));
			profileService.saveProfile(new Profile(2L, "profile2", "profile2@email.com", "password", 1L, 1L, "temp".getBytes()));
			profileService.saveProfile(new Profile(3L, "profile3", "profile3@email.com", "password", 1L, 1L, "temp".getBytes()));
		};
	}

}
