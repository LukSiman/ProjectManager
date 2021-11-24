package com.lukas.project_manager.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "project_images")
@Getter
@Setter
public class ProjectImages {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "project_id")
    private Integer project_id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
