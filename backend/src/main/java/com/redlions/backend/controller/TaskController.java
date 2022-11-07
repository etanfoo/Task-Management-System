package com.redlions.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        public Long profileAssignee;
    }

    public static class UpdateAssigneeJson {
        public Long profileId;
        public Long newAssigneeId;
    }

    public static class deleteTaskJson {
        public Long profileId;
    }

    /**
     * post mapping to add a new task
     * @param json
     * @param projectId
     * @return
     */
    @PostMapping(value = "/{projectId}/task")
    @ResponseStatus(HttpStatus.OK)
    public Task saveTask(@RequestBody TaskJson json, @PathVariable Long projectId) {
        Task task = json.task;
        Long profileAssignee = json.profileAssignee;
        Long profileId = json.profileId;
        return taskService.create(task, projectId, profileId, profileAssignee);
    }

    /**
     * put mapping to update a task's info
     * @param json
     * @param projectId
     * @param taskId
     * @return
     */
    @PutMapping(value = "/{projectId}/task/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public Task updateTask(@RequestBody TaskJson json, @PathVariable Long projectId, @PathVariable Long taskId) {
        Task task = json.task;
        Long profileAssignee = json.profileAssignee;
        Long profileId = json.profileId;
        return taskService.update(task, projectId, profileId, taskId, profileAssignee);
    }

    /**
     * get mapping to return a single task info given a task id
     * @param projectId
     * @param taskId
     * @return
     */
    @GetMapping(value = "/{projectId}/task/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public Task findById(@PathVariable Long projectId, @PathVariable Long taskId) {
        return taskService.getTask(projectId, taskId);
    }

    /**
     * delete mapping to delete a single task given a task id
     * @param json
     * @param projectId
     * @param taskId
     */
    @DeleteMapping(value = "/{projectId}/task/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@RequestBody deleteTaskJson json, @PathVariable Long projectId, @PathVariable Long taskId) {
        Long profileId = json.profileId;
        taskService.delete(profileId, projectId, taskId);
    }
}
