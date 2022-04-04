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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Integer imageId;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProjectImages other = (ProjectImages) obj;
        return imageId != null && imageId.equals(other.getImageId()) && imageUrl.equals(other.getImageUrl());
    }

    @Override
    public int hashCode() {
        return this.getImageId()*37;
    }
}
