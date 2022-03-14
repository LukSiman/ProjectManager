package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Page<Project> findBy(Pageable pageable);

    Page<Project> findByNameContaining(@Param("name") String name, Pageable pageable);

    Page<Project> findByStatusContaining(@Param("status") String name, Pageable pageable);
}