package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.ProjectTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends JpaRepository<ProjectTasks, Integer> {
}
