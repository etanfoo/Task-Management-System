package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Project;

public interface ProjectService {
    Project create(Project project, Long profileId);
    Project update(Project project, Long projectId, Long profileId);
    Project getProject(Long id);
    void delete(Long id);
    List<Project> getProjects();
}
