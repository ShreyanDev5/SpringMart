package com.backend.springmart;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
// Smoke test: if this passes, Spring could create the full application context.
class SpringMartApplicationTests {

	@Test
	void contextLoads() {
		// No assertions are needed here; startup failure would fail the test
		// automatically.
	}

}
