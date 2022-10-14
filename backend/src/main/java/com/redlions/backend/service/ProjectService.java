package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

import com.redlions.backend.entity.Project;

public interface ProjectService {
    Project create(Project project, Long profileId, Set<Long> profileIdsToAdd);
    Project update(Project project, Long projectId, Long profileId, Set<Long> profileIds);
    Project getProject(Long id);
    void delete(Long id);
    List<Project> getProjects();
}
