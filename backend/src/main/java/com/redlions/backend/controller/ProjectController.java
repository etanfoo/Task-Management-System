package com.redlions.backend.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;
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
        public Set<Long> profileIdsToAdd;
    }

    public static class deleteProjectJson {
        public Long profileId;
    }

    public static class removeProfilesFromProject {
        public Long profileId;
        public Set<Long> profileIdsToRemove;
    }

    public static class removeProfileFromProject {
        public Long profileId;
        public Long profileIdToRemove;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Project saveProject(@RequestBody ProjectJson projectJson) {
        Project project = projectJson.project;
        Long profileId = projectJson.profileId;
        Set<Long> profileIdsToAdd = projectJson.profileIdsToAdd;
        return projectService.create(project, profileId, profileIdsToAdd);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody ProjectJson projectJson, @PathVariable Long id) {
        Project project = projectJson.project;
        Long profileId = projectJson.profileId;
        Set<Long> profileIdsToAdd = projectJson.profileIdsToAdd;
        projectService.update(project, id, profileId, profileIdsToAdd);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Project findById(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@RequestBody deleteProjectJson json, @PathVariable Long id) {
        Long profileId = json.profileId;
        projectService.delete(id, profileId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Project> getAssociatedProjects(@RequestParam(value="profileId") Long profileId) {
        return projectService.getAssociatedProjects(profileId);
    }

    @DeleteMapping(value = "/{id}/removeProfiles")
    @ResponseStatus(HttpStatus.OK)
    public void removeProfilesFromProject(@RequestBody removeProfilesFromProject json, @PathVariable Long id) {
        Long profileId = json.profileId;
        Set<Long> profileIdsToRemove = json.profileIdsToRemove;
        projectService.removeProfilesFromProject(id, profileId, profileIdsToRemove);    
    }

    @DeleteMapping(value = "/{id}/removeProfile")
    @ResponseStatus(HttpStatus.OK)
    public void removeProfileFromProject(@RequestBody removeProfileFromProject json, @PathVariable Long id) {
        Long profileId = json.profileId;
        Long profileIdToRemove = json.profileIdToRemove;
        projectService.removeProfileFromProject(id, profileId, profileIdToRemove);    
    }

    @GetMapping(value = "/{id}/allTasks")
    @ResponseStatus(HttpStatus.OK)
    public Set<Task> getProjectTasks(@PathVariable Long id) {
        return projectService.getProjectTasks(id);
    }
}
