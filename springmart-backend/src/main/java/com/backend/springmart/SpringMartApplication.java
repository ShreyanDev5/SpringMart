package com.backend.springmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// Starts Spring Boot and tells it to scan this package for controllers,
// services, and repositories.
public class SpringMartApplication {
	public static void main(String[] args) {
		// Bootstraps the whole backend and creates the Spring application context.
		SpringApplication.run(SpringMartApplication.class, args);
	}
}
