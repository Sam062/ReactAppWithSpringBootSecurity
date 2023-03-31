package base.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import base.entity.UserEntity;
import base.repo.UserRepo;

@RestController
public class Controller {

	private static List<String> assessments = List.of("ASS-1", "ASS-2", "ASS-3", "ASS-4");
	private static List<String> testSets = List.of("TEST_SET-1", "TEST_SET-2", "TEST_SET-3", "TEST_SET-4");
	private static List<String> results = List.of("RESULT-1", "RESULT", "RESULT-3", "RESULT-4");

	@Autowired
	private UserRepo userRepo;

	@GetMapping("/test")
	public String demo() {
		return "Up and running...";
	}

	@GetMapping("/public")
	public String publicAccess() {
		return "public content";
	}

	@GetMapping("/user")
	public List<UserEntity> userAccess() {
		return userRepo.findAll();
	}

	@GetMapping("/reviewer")
	public String reviewerAccess() {
		return "reviewer content";
	}

	@GetMapping("/admin")
	public String adminAccess() {
		return "admin content";
	}

	@GetMapping("/assessments")
	public List<String> assessments() {
		return assessments;
	}

	@GetMapping("/ts")
	public List<String> testSet() {
		return testSets;
	}

	@GetMapping("/rs")
	public List<String> result() {
		return results;
	}

}
