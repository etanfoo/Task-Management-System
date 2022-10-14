package com.redlions.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.redlions.backend.entity.Project;
import com.redlions.backend.service.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
@CrossOrigin
public class ProjectController {
    private final ProjectService projectService;

    public static class ProjectJson {
        public Project project;
        public Long profileId;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Project saveProject(@RequestBody ProjectJson projectJson) {
        Project project = projectJson.project;
        Long profileId = projectJson.profileId;
        return projectService.create(project, profileId);
    }

    @PutMapping(value = "/{projectId}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody ProjectJson projectJson, @PathVariable Long projectId) {
        Project project = projectJson.project;
        Long profileId = projectJson.profileId;
        projectService.update(project, projectId, profileId);
    }
}
