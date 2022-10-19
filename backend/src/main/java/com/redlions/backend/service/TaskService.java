package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Task;

public interface TaskService {
    Task create(Task task, Long projectId, Long profileId);
    Task update(Task task, Long projectId, Long profileId, Long taskId);
    Task getTask(Long id);
    void delete(Long id);
    List<Task> getAssociatedTasks(Long profileId);
    Task updateAssignee(Long taskId, Long profileId, Long newAssigneeId);
}