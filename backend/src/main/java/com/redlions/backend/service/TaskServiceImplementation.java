package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;

public class TaskServiceImplementation implements TaskService {
    public Task create(Task task, Project project, Long profileId) {
        return null;
    }

    public Task update(Task task, Project project, Long profileId) {
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
