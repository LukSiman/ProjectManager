package com.lukas.project_manager.service;

import com.lukas.project_manager.entities.Project;

public interface ProjectService {

    Project saveProject(Project project);

    Project updateProject(Project project);

    String deleteProject(int id);
}
