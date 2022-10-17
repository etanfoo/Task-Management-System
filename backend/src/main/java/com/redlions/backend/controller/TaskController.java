package com.redlions.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.redlions.backend.entity.Task;
import com.redlions.backend.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {
    private final TaskService taskService;
    
    public static class TaskJson {
        public Task task;
        public Long profileId;
    }

    @PostMapping(value ="/{projectId}/task")
    @ResponseStatus(HttpStatus.OK)
    public Task saveTask(@RequestBody TaskJson json, @PathVariable Long projectId) {
        Task task = json.task;
        Long profileId = json.profileId;
        return taskService.create(task, projectId, profileId);
    }
}
