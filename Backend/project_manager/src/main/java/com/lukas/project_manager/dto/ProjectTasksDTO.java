package com.lukas.project_manager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTasksDTO {

    private Integer taskId;
    private Integer taskOrder;
    private String taskDescription;
    private String taskStatus;
}
