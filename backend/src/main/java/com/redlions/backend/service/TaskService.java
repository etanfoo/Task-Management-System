package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;

public interface TaskService {
    Task create(Task task, Project project, Long profileId);
    Task update(Task task, Project project, Long profileId);
    Task getTask(Long id);
    void delete(Long id);
    void removeProfilesFromTask(Long taskId, Long profileId, Set<Long> profileIds);
    List<Task> getAssociatedTasks(Long profileId);
}
