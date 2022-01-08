package com.lukas.project_manager.controller;

import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.service.DBUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/response")
public class ProjectController {

    private final DBUpdateService dbUpdateService;

    @Autowired
    public ProjectController(DBUpdateService dbUpdateService){
        this.dbUpdateService = dbUpdateService;
    }

    @PostMapping("/postbody")
    public String addProject(@RequestBody Project project){

        return dbUpdateService.saveProject(project);
    }
}
