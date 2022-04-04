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
    private Integer taskId;

    @Column(name = "task_order")
    private Integer taskOrder;

    @Column(name = "task_description")
    private String taskDescription;

    @Column(name = "task_status")
    private String taskStatus;

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
        return taskId != null && taskId.equals(other.getTaskId()) && taskDescription.equals(other.getTaskDescription());
    }

    @Override
    public int hashCode() {
        return this.getTaskId()*37;
    }
}
