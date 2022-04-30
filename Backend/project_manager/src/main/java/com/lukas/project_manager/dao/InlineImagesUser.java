package com.lukas.project_manager.dao;

import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import com.lukas.project_manager.entities.User;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;
import java.util.List;

@Projection(name = "InlineImagesUser", types = { Project.class })
public interface InlineImagesUser {

    Integer getId();
    String getName();
    LocalDate getStartDate();
    LocalDate getEndDate();
    Long getLength();
    String getDescription();
    String getStatus();
    List<ProjectImages> getImages();
    User getUser();
}
