package com.backend.springmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the SpringMart Spring Boot application.
 * Configures auto-configuration, component scanning, and starts the embedded web server.
 */
@SpringBootApplication
public class SpringMartApplication
{
	/**
	 * Launches the Spring Boot application context.
	 *
	 * @param args command-line arguments passed to the application
	 */
	public static void main(String[] args)
	{
		SpringApplication.run(SpringMartApplication.class, args);
	}
}
