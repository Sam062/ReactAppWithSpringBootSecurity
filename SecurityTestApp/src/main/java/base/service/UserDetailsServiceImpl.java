package base.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import base.entity.UserEntity;
import base.repo.UserRepo;
import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepo userRepository;

	public UserEntity saveUser(UserEntity user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public Optional<UserEntity> findByUserName(String userName) {
		return userRepository.findByName(userName);
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserEntity user = findByUserName(username)
				.orElseThrow(() -> new UsernameNotFoundException("Error: user not found with username : " + username));

		return UserDetailsImpl.build(user);
	}

	public void deleteUser(Integer id) {
		Optional<UserEntity> entity = userRepository.findById(id);
		userRepository.delete(entity.get());

	}

}
