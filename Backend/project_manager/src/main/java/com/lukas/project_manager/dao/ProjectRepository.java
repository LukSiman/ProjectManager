package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Page<Project> findBy(Pageable pageable); // delete this after fixing frontend

    Page<Project> findByOrderByNameAsc(Pageable pageable);

    Page<Project> findByOrderByNameDesc(Pageable pageable);

    Page<Project> findByOrderByStartDateAsc(Pageable pageable);

    Page<Project> findByOrderByStartDateDesc(Pageable pageable);

    Page<Project> findByOrderByEndDateAsc(Pageable pageable);

    Page<Project> findByOrderByEndDateDesc(Pageable pageable);

    Page<Project> findByOrderByLengthAsc(Pageable pageable);

    Page<Project> findByOrderByLengthDesc(Pageable pageable);

    Page<Project> findByNameContaining(@Param("name") String name, Pageable pageable); // delete this after fixing frontend

    Page<Project> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByNameDesc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByStartDateAsc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByStartDateDesc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByEndDateAsc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByEndDateDesc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByLengthAsc(@Param("name") String name, Pageable pageable);

    Page<Project> findByNameContainingOrderByLengthDesc(@Param("name") String name, Pageable pageable);
}