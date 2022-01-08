package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ProjectRepository;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.concurrent.TimeUnit;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    @Transactional
    public Project saveProject(Project project) {

        // calculate difference between dates for the length
        if(project.getEndDate() != null){
            long timeDifference = Math.abs(project.getStartDate().getTime() - project.getEndDate().getTime());
            long dayDifference = TimeUnit.DAYS.convert(timeDifference, TimeUnit.MILLISECONDS);
            project.setLength(dayDifference);
        }

        // add default image if no image has been uploaded
        if(project.getImages() == null){
            ProjectImages projectImages = new ProjectImages();
            projectImages.setImageUrl("assets/images/projects/default.jpg");

            project.addImages(projectImages);
        } else {
            System.out.println("Test");
        }

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        /* NEED TO FINISH
            Probably need to use ids, but do I use them from JSON or from path Variable or both?
            I think I need to use both, ID to find the object and JSON to update the data
        */

        int id = project.getId();
        projectRepository.getById(id);
        return null;
    }

    @Override
    public String deleteProject(int id) {
        String projectName = projectRepository.getById(id).getName();
        projectRepository.deleteById(id);
        return projectName + " has been deleted";
    }
}
