package com.lukas.project_manager.controller;

import com.lukas.project_manager.dto.ProjectDTO;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.service.ProjectServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private final ProjectServiceImpl projectService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public ProjectController(ProjectServiceImpl projectService) {
        this.projectService = projectService;
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<ProjectDTO> getProject(@PathVariable int id){

        Project project = projectService.getProject(id);

        // convert entity to DTO
        ProjectDTO projectResponse = modelMapper.map(project, ProjectDTO.class);

        return new ResponseEntity<>(projectResponse, HttpStatus.OK);
    }

    @PostMapping("/save")
    @ResponseBody
    public ResponseEntity<ProjectDTO> addProject(@RequestBody ProjectDTO projectDTO) {

        // convert DTO to entity
        Project projectRequest = modelMapper.map(projectDTO, Project.class);

        Project project = projectService.saveProject(projectRequest);

        // convert entity to DTO
        ProjectDTO projectResponse = modelMapper.map(project, ProjectDTO.class);

        return new ResponseEntity<>(projectResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public String deleteProject(@PathVariable int id) {
        return projectService.deleteProject(id);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {

        // convert DTO to entity
        Project projectRequest = modelMapper.map(projectDTO, Project.class);

        Project project = projectService.updateProject(projectRequest);

        // convert entity to DTO
        ProjectDTO projectResponse = modelMapper.map(project, ProjectDTO.class);

        return new ResponseEntity<>(projectResponse, HttpStatus.OK);
    }
}
