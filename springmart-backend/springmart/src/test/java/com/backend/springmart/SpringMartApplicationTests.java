package com.backend.springmart;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringMartApplicationTests {

	@Test
	void contextLoads()
	{
		// This test will simply check if the Spring application context loads successfully.
		// If there are any issues with the configuration, this test will fail.
		// You can add more specific tests for your application logic in separate test classes.
		System.out.println("✅ Spring application context loaded successfully.");
	}

}
