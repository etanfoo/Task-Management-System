package com.redlions.backend.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;
import com.redlions.backend.repository.ProfileRepository;
import com.redlions.backend.repository.ProjectRepository;
import com.redlions.backend.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Util {
    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;
    private final TaskRepository taskRepo;

    /**
     * checks if profile with corresponding id exists
     * throws http error if it doesn't
     * @param profileId
     * @return
     */
    public Profile checkProfile(Long profileId) {
        Profile profile = profileRepo.findById(profileId).stream().findFirst().orElse(null);
        if (profile == null) {
            String errorMessage = String.format("User with id %d does not exist.", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return profile;
    }

    /**
     * checks if project with corresponding id exists
     * throws http error if it doesn't
     * @param projectId
     * @return
     */
    public Project checkProject(Long projectId) {
        Project project = projectRepo.findById(projectId).stream().findFirst().orElse(null); // convert Optional<Project> to Project
        if (project == null) {
            String errorMessage = String.format("Project with id %d does not exist.", projectId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return project;
    }

    /**
     * checks if task with corresponding id exists
     * throws http error if it doesn't
     * @param taskId
     * @return
     */
    public Task checkTask(Long taskId) {
        Task task = taskRepo.findById(taskId).stream().findFirst().orElse(null); // convert Optional<Task> to Task
        if (task == null) {
            String errorMessage = String.format("Task with id %d does not exist.", taskId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return task;
    }

    /**
     * checks if profile is in a project
     * throws an http error if profile is not a member
     * @param profileId
     * @param projectId
     * @param projectInDb
     */
    public void isProfileInProject(Long profileId, Long projectId, Project projectInDb) {
        Set<Profile> profiles = projectInDb.getProfiles();
        boolean found = false;
        for (Profile p: profiles) {
            if (p.getId() == profileId) {
                found = true;
            }
        }
        if (found == false) {
            String errorMessage = String.format("Profile with profile id %d is not a member of Project with id %d.", profileId, projectId);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, errorMessage);
        }
    }

    /**
     * checks if task is in a project
     * throws an http error if task is not part of project
     * @param projectId
     * @param taskId
     */
    public void isTaskInProject(Long projectId, Long taskId) {
        Project project = projectRepo.findById(projectId).stream().findFirst().orElse(null);
        Set<Task> tasks = project.getTasks();
        boolean found = false;
        for (Task t: tasks) {
            if (t.getId() == taskId) {
                found = true;
            }
        }
        if (found == false) {
            String errorMessage = String.format("Task with task id %d is not a task of Project with id %d.", taskId, projectId);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, errorMessage);
        }
    }

    /**
     * loops through a set of id's and returns corresponding objects
     * throws an http error if any id not found
     * @param profileIdsToAdd
     * @return
     */
    public Set<Profile> getProfilesFromIds(Set<Long> profileIdsToAdd) {
        Set<Profile> profiles = new HashSet<>();
        for (Long currProfileId: profileIdsToAdd) {
            Profile currProfile = profileRepo.findById(currProfileId).stream().findFirst().orElse(null);
            if (currProfile == null) {
                String errorMessage = String.format("Profile with id %d does not exist.", currProfileId);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            } else {
                profiles.add(currProfile);
            }
        }
        return profiles;
    }
}
