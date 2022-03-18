package com.lukas.project_manager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTasksDTO {

    private Integer id;
    private Integer order;
    private String description;
    private String status;
}
