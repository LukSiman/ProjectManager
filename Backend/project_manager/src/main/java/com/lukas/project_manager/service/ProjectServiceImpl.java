package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ProjectRepository;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import com.lukas.project_manager.exceptions.TooManyImagesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectServiceImpl implements ProjectService {

    private static final int MAX_IMAGES = 6;

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
    public Project updateProject(Project project) {
        Project projectToUpdate = projectRepository.getById(project.getId());

        // checks if there was a date change
        boolean dateChange = false;

        // update if names are different
        if (!Objects.equals(project.getName(), projectToUpdate.getName())) {
            projectToUpdate.setName(project.getName());
        }

        // update if start dates are different and set boolean to true
        if (!Objects.equals(project.getStartDate(), projectToUpdate.getStartDate())) {
            projectToUpdate.setStartDate(project.getStartDate());
            dateChange = true;
        }

        // update if end dates are different and set boolean to true
        if (!Objects.equals(project.getEndDate(), projectToUpdate.getEndDate())) {
            projectToUpdate.setEndDate(project.getEndDate());
            dateChange = true;
        }

        // if there was a date change then calculate the new length of the project
        if (dateChange) {
            if (project.getEndDate() != null) {
                long newLength = calculateLength(project.getStartDate(), project.getEndDate());
                projectToUpdate.setLength(newLength);
            }
        }

        // update if description is different
        if (!Objects.equals(project.getDescription(), projectToUpdate.getDescription())) {
            projectToUpdate.setDescription(project.getDescription());
        }

        // update if images are different
        if (project.getImages() != projectToUpdate.getImages()) {
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

        // throw exception if more image than maximum size
        if (imageList.size() > MAX_IMAGES) {
            throw new TooManyImagesException();
        }

        imageList.forEach(img -> {
            // if project has no images add a default image
            if (img.getImageUrl() == null || img.getImageUrl().isEmpty()) {
                img.setImageUrl("assets/images/projects/default.png");
            }
            img.setProject(project);
        });
    }
}
