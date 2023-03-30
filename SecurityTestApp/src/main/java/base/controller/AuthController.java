package base.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import base.entity.ERole;
import base.entity.Role;
import base.entity.UserEntity;
import base.repo.RolesRepo;
import base.repo.UserRepo;
import base.request.LoginRequest;
import base.request.SignUpRequest;
import base.response.JwtResponse;
import base.service.UserDetailsImpl;
import base.utils.JwtUtils;

@CrossOrigin(origins = "*")
@RestController
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private RolesRepo roleRepo;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtUtils.generateToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return new ResponseEntity<>(new JwtResponse("Bearer " + token, "Bearer", userDetails.getId(),
				userDetails.getUsername(), userDetails.getEmail(), roles), HttpStatus.OK);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody SignUpRequest request) {
		if (userRepo.existsByName(request.getUsername())) {
			return new ResponseEntity<>("ERROR: username is already taken.", HttpStatus.BAD_REQUEST);
		}
		if (userRepo.existsByName(request.getEmail())) {
			return new ResponseEntity<>("ERROR: email is already taken.", HttpStatus.BAD_REQUEST);
		}

		UserEntity user = new UserEntity();
		user.setName(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		Set<String> selectedRoles = request.getRoles();
		Set<Role> roles = new HashSet<>();

		if (selectedRoles == null) {
			Role userRole = roleRepo.findByName(ERole.USER)
					.orElseThrow(() -> new RuntimeException("Error: Role not found."));
			roles.add(userRole);
		} else {
			selectedRoles.forEach(role -> {
				switch (role.toLowerCase()) {
				case "admin":
					Role adminRole = roleRepo.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Admin role not found."));

					roles.add(adminRole);
					break;
				case "reviewer":
					Role reviewerRole = roleRepo.findByName(ERole.REVIEWER)
							.orElseThrow(() -> new RuntimeException("Error: Reviewer role not found."));

					roles.add(reviewerRole);
					break;

				default:
					Role userRole = roleRepo.findByName(ERole.USER)
							.orElseThrow(() -> new RuntimeException("Error: User role not found."));

					roles.add(userRole);
					break;

				}
			});
		}
		user.setRoles(roles);
		UserEntity savedUser = userRepo.save(user);

		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

	}

}
