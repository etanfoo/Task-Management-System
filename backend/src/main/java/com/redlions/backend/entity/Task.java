package com.redlions.backend.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "points")
    private Integer points;

    @Column(name = "status")
    private Integer status;

    @ManyToOne()
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne()
    @JoinColumn(name = "author_id")
    private Profile profileAuthor;

    @ManyToOne()
    @JoinColumn(name = "assignee_id")
    private Profile profileAssignee;

    public Task() {

    }

    public Task(Long id, String title, String description, LocalDate deadline) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {
        return this.deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Profile getProfileAuthor() {
        return this.profileAuthor;
    }

    public void setProfileAuthor(Profile profileAuthor) {
        this.profileAuthor = profileAuthor;
    }

    public Profile getProfileAssignee() {
        return this.profileAssignee;
    }

    public void setProfileAssignee(Profile profileAssignee) {
        this.profileAssignee = profileAssignee;
    }

    public Integer getPoints() {
        return this.points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", title='" + getTitle() + "'" +
                ", description='" + getDescription() + "'" +
                ", deadline='" + getDeadline() + "'" +
                ", points='" + getPoints() + "'" +
                ", project='" + getProject() + "'" +
                ", profileAuthor='" + getProfileAuthor() + "'" +
                ", profileAssignee='" + getProfileAssignee() + "'" +
                "}";
    }

}
