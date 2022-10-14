package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Project;

public interface ProjectService {
    Project create(Project project);
    Project update(Project project, Long id);
    Project getProject(Long id);
    List<Project> getProjects();
}
