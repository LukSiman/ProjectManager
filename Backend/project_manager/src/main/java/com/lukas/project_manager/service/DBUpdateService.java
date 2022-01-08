package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ProjectRepository;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.ProjectImages;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.concurrent.TimeUnit;

@Service
public class DBUpdateService {

    private final ProjectRepository projectRepository;

    public DBUpdateService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    @Transactional
    public String saveProject(Project project){

        // calculate difference between dates for the length
        if(project.getEndDate() != null){
            long timeDifference = Math.abs(project.getStartDate().getTime() - project.getEndDate().getTime());
            long dayDifference = TimeUnit.DAYS.convert(timeDifference, TimeUnit.MILLISECONDS);
            project.setLength(dayDifference);
        }

        if(project.getImages() == null){
            ProjectImages projectImages = new ProjectImages();
            projectImages.setImageUrl("assets/images/projects/default.jpg");

            project.addImages(projectImages);
        }

        projectRepository.save(project);
        return "Project had been added!";
    }
}
