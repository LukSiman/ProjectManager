package com.lukas.project_manager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTasksDTO {

    private Integer task_id;
    private Integer task_order;
    private String task_description;
    private String task_status;
}
