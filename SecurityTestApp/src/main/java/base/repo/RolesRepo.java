package base.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import base.entity.ERole;
import base.entity.Role;

public interface RolesRepo extends JpaRepository<Role, Integer> {

	Optional<Role> findByName(ERole roleUser);

}
