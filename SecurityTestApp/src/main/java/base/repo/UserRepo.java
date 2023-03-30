package base.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import base.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Integer> {

	Optional<UserEntity> findByName(String userName);

	Boolean existsByEmail(String email);

	Boolean existsByName(String name);

}
