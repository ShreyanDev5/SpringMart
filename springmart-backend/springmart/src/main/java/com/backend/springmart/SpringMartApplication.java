package com.backend.springmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringMartApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringMartApplication.class, args);
	}
}
// --------------------------------------------------------------------------------------
// SpringMartApplication: Entry point for the Spring Boot application.
//
// Key details:
// - Contains the main method that launches the Spring application context.
// - Annotated with @SpringBootApplication, which enables component scanning,
// autoconfiguration, and configuration properties.
// - All controllers, services, repositories, and configuration classes are
// discovered and managed from this root package.
// - No business logic here; serves solely to bootstrap the backend.
//
// Understanding this structure helps when configuring or extending the
// application's startup behavior.
