package com.backend.springmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringMartApplication serves as the main entry point and runtime launcher for the backend.
 * 
 * The {@code @SpringBootApplication} annotation is a powerful meta-annotation that bundles:
 * 1. {@code @Configuration}: Declares this class as a source of bean definitions.
 * 2. {@code @EnableAutoConfiguration}: Instructs Spring Boot to automatically configure beans based on classpath dependencies (e.g., configuring H2 and JPA automatically).
 * 3. {@code @ComponentScan}: Scans the current package {@code com.backend.springmart} and its sub-packages for Spring components (Controllers, Services, Repositories).
 */
@SpringBootApplication
public class SpringMartApplication
{
	/**
	 * Launches the Spring Boot application context and boots the embedded server (Tomcat by default).
	 *
	 * @param args optional command-line arguments passed during startup
	 */
	public static void main(String[] args)
	{
		SpringApplication.run(SpringMartApplication.class, args);
	}
}
