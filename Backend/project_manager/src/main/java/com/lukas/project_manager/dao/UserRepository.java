package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsUserByUsername(String username);

    User findByUsername(String username);
}
