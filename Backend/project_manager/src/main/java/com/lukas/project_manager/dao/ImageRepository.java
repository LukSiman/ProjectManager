package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.ProjectImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "images", path = "images")
public interface ImageRepository extends JpaRepository<ProjectImages, Integer> {
}
