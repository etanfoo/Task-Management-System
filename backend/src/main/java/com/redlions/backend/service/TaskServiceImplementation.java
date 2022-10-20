package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.redlions.backend.entity.Task;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImplementation implements TaskService {
    public Task create(Task task, Long projectId, Long profileId) {
        return null;
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
