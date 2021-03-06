package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ProjectRepository;
import com.lukas.project_manager.dao.UserRepository;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import com.lukas.project_manager.entities.ProjectTasks;
import com.lukas.project_manager.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@SuppressWarnings("unchecked")
@Service
public class ProjectServiceImpl implements ProjectService {

    private static final int MAX_IMAGES = 6;

    @Autowired
    private final ProjectRepository projectRepository;

    @Autowired
    private final UserRepository userRepository;

    private final FileServiceImpl fileService;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, FileServiceImpl fileService) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    @Override
    public Project getProject(int id) {
        // Sort tasks by taskOrder
        Project returnProject = projectRepository.getById(id);
        List<ProjectTasks> sortedTasks = returnProject.getTasks();
        Collections.sort(sortedTasks);
        returnProject.setTasks(sortedTasks);

        return returnProject;
    }

    @Override
    @Transactional
    public Project saveProject(Project project) {
        // calculate difference between dates for the length

        handleUser(project);

        if (project.getEndDate() != null) {
            long dayDifference = calculateLength(project.getStartDate(), project.getEndDate());
            project.setLength(dayDifference);
        }

        // add the tasks
        if (project.getTasks().size() > 0) {
            handleTasks(project);
        }

        // add the image
        if (project.getImages().size() > 0) {
            handleImages(project);
        }

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

        // update if description is different
        if (!Objects.equals(project.getStatus(), projectToUpdate.getStatus())) {
            projectToUpdate.setStatus(project.getStatus());
        }

        // update if tasks are different
        if (!Objects.equals(project.getTasks(), projectToUpdate.getTasks())) {
            handleTasks(project, projectToUpdate);
        }

        // update if images are different
        if (!Objects.equals(project.getImages(), projectToUpdate.getImages())) {
            handleImages(project, projectToUpdate);
        }

        return projectRepository.save(projectToUpdate);
    }

    @Override
    public String deleteProject(int id) {
        String projectName = projectRepository.getById(id).getName();

        // deletes images
        List<ProjectImages> images = projectRepository.getById(id).getImages();
        fileService.delete(images);

        projectRepository.deleteById(id);
        return projectName + " has been deleted";
    }

    // helper method to calculate day difference between dates
    private long calculateLength(LocalDate startDate, LocalDate endDate) {
        return ChronoUnit.DAYS.between(startDate, endDate);
    }

    // handle adding tasks to the project when updating
    private void handleTasks(Project project, Project projectToUpdate) {
        //create an ArrayList that holds the received project tasks
        List<ProjectTasks> newTasks = new ArrayList<>(project.getTasks());

        // create an ArrayList that holds the tasks of the project from DB
        List<ProjectTasks> removedTasks = new ArrayList<>(projectToUpdate.getTasks());

        // leave only the new tasks
        newTasks.removeAll(projectToUpdate.getTasks());

        // leave only the removed tasks
        removedTasks.removeAll(project.getTasks());

        // add the new tasks to the DB
        if (newTasks.size() > 0) {
            newTasks.forEach(newTask -> {
                newTask.setProject(projectToUpdate);
                projectToUpdate.getTasks().add(newTask);
            });
        }

        // remove the tasks from the project in DB
        if (removedTasks.size() > 0) {
            removedTasks.forEach(removedTask -> projectToUpdate.getTasks().remove(removedTask));
        }
    }

    // handle adding tasks to the project
    private void handleTasks(Project project) {
        List<ProjectTasks> tasks = new ArrayList<>(project.getTasks());

        tasks.forEach(task -> task.setProject(project));
    }

    // handle adding images to the project when updating
    private void handleImages(Project project, Project projectToUpdate) {
        //create an ArrayList that holds the received project images
        List<ProjectImages> newImages = new ArrayList<>(project.getImages());

        // create an ArrayList that holds the images of the project from DB
        List<ProjectImages> removedImages = new ArrayList<>(projectToUpdate.getImages());

        // leave only the new images
        newImages.removeAll(projectToUpdate.getImages());

        // leave only the removed images
        removedImages.removeAll(project.getImages());

        // add the new image to the DB
        if (newImages.size() > 0) {
            newImages.forEach(newImage -> {
                newImage.setProject(projectToUpdate);
                projectToUpdate.getImages().add(newImage);
            });
        }

        // remove the images from the project in DB and the image file
        if (removedImages.size() > 0) {
            removedImages.forEach(removedImage -> projectToUpdate.getImages().remove(removedImage));
            fileService.delete(removedImages);
        }
    }

    // handle adding images to the project
    private void handleImages(Project project) {
        List<ProjectImages> images = new ArrayList<>(project.getImages());

        images.forEach(image -> image.setProject(project));
    }

    // handle user of the project
    private void handleUser(Project project) {
        User user = userRepository.findByUsername(project.getUser().getUsername());
        user.getProjects().add(project);
        project.setUser(user);
    }
}