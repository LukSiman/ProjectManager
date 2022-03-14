package com.lukas.project_manager.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ProjectDTO {

    private Integer id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long length;
    private String description;
    private String status;
    private List<ProjectImagesDTO> images;
}
