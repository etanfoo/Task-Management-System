package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Task;

public interface TaskService {
    Task create(Task task, Long projectId, Long profileAuthor, Long profileAssignee);
    Task update(Task task, Long projectId, Long profileId, Long taskId, Long profileAssignee);
    Task getTask(Long projectId, Long taskId);
    void delete(Long profileId, Long projectId, Long taskId);
    List<Task> getAssociatedTasks(Long profileId);
}
