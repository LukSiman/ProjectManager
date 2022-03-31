package com.lukas.project_manager.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "project_tasks")
@Getter
@Setter
public class ProjectTasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer task_id;

    @Column(name = "task_order")
    private Integer task_order;

    @Column(name = "task_description")
    private String task_description;

    @Column(name = "task_status")
    private String task_status;

    @ManyToOne
    @JoinColumn(name = "project_id_task")
    private Project project;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProjectTasks other = (ProjectTasks) obj;
        return task_id != null && task_id.equals(other.getTask_id()) && task_description.equals(other.getTask_description());
    }

    @Override
    public int hashCode() {
        return this.getTask_id()*37;
    }
}
