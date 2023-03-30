package base.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	@GetMapping("/test")
	public String demo() {
		return "Up and running...";
	}

	@GetMapping("/user")
	public String userAccess() {
		return "user content";
	}

	@GetMapping("/reviewer")
	public String reviewerAccess() {
		return "reviewer content";
	}

	@GetMapping("/admin")
	public String adminAccess() {
		return "admin content";
	}
}
