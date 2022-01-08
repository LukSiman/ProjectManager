package com.lukas.project_manager.dto;

import com.lukas.project_manager.entities.ProjectImages;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProjectDTO {

    private Integer id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Long length;
    private String description;
    private List<ProjectImagesDTO> images;
}
