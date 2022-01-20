package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ProjectRepository;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project getProject(int id) {
        return projectRepository.getById(id);
    }

    @Override
    @Transactional
    public Project saveProject(Project project) {
        // calculate difference between dates for the length
        if (project.getEndDate() != null) {
            long dayDifference = calculateLength(project.getStartDate(), project.getEndDate());
            project.setLength(dayDifference);
        }

        // add an image
        handleImages(project);

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project updateProject(Project project, int id) {
        Project projectToUpdate = projectRepository.getById(id);

        boolean dateChange = false;

        if (!Objects.equals(project.getName(), projectToUpdate.getName())) {
            projectToUpdate.setName(project.getName());
        }

        if (!Objects.equals(project.getStartDate(), projectToUpdate.getStartDate())) {
            projectToUpdate.setStartDate(project.getStartDate());
            dateChange = true;
        }

        if (!Objects.equals(project.getEndDate(), projectToUpdate.getEndDate())) {
            projectToUpdate.setEndDate(project.getEndDate());
            dateChange = true;
        }

        if (dateChange) {
            if (project.getEndDate() != null) {
                long newLength = calculateLength(project.getStartDate(), project.getEndDate());
                projectToUpdate.setLength(newLength);
            }
        }

        if (!Objects.equals(project.getDescription(), projectToUpdate.getDescription())) {
            projectToUpdate.setDescription(project.getDescription());
        }

        // TODO: make image change work
        if (!Objects.equals(project.getImages(), projectToUpdate.getImages())) {
            projectToUpdate.setImages(project.getImages());
            handleImages(projectToUpdate);
        }

        return projectRepository.save(projectToUpdate);
    }

    @Override
    public String deleteProject(int id) {
        String projectName = projectRepository.getById(id).getName();
        projectRepository.deleteById(id);
        return projectName + " has been deleted";
    }

    // helper method to calculate day difference between dates
    private long calculateLength(LocalDate startDate, LocalDate endDate) {
        return ChronoUnit.DAYS.between(startDate, endDate);
    }

    // handle adding images to the project
    private void handleImages(Project project) {
        List<ProjectImages> imageList = project.getImages();
        imageList.forEach(img -> {
            // if project has no images add a default image
            if (img.getImageUrl() == null || img.getImageUrl().isEmpty()) {
                img.setImageUrl("assets/images/projects/default.png");
            }
            img.setProject(project);
        });
    }
}
