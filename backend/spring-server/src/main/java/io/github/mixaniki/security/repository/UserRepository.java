package io.github.mixaniki.security.repository;

import io.github.mixaniki.security.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findFirstByUsername(String username);

}
