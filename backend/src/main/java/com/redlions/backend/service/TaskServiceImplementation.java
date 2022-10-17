package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;
import com.redlions.backend.repository.TaskRepository;
import com.redlions.backend.util.Util;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImplementation implements TaskService {
    private final TaskRepository taskRepo;
    private final Util util;
    private final int DESCRIPTION_CHARACTER_LIMIT = 1000;

    public Task create(Task task, Long projectId, Long profileId) {
        Profile profile = util.checkProfile(profileId);
        Project project = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, project);

        if (task.getTitle() == null) {
            String errorMessage = String.format("Task must contain a title", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        String description = task.getDescription();

        if (description != null && description.length() > DESCRIPTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        task.setProfileAuthor(profile);
        task.setProject(project);

        return taskRepo.save(task);
    }

    public Task update(Task task, Long projectId, Long profileId) {
        return null;
    }

    public Task getTask(Long id) {
        return null;
    }

    public void delete(Long id) {

    }

    public void removeProfilesFromTask(Long taskId, Long profileId, Set<Long> profileIds) {

    }

    public List<Task> getAssociatedTasks(Long profileId) {
        return null;
    }
}
