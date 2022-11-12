package com.redlions.backend.service;

import java.sql.Date;

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
    
    private final Integer TASK_NOT_STARTED = 0;
    private final Integer TASK_IN_PROGRESS = 1;
    private final Integer TASK_COMPLETE = 2;
    private final Integer TASK_BLOCKED = 3;

    /**
     * creates a task and save it to database
     * throws error if task does not contain a title, points or description is too long
     */
    public Task create(Task task, Long projectId, Long profileAuthor, Long profileAssignee) {
        Project project = util.checkProject(projectId);
        util.isProfileInProject(profileAuthor, projectId, project);

        if (task.getTitle() == null) {
            String errorMessage = String.format("Task must contain a title");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        if (task.getPoints() == null) {
            String errorMessage = String.format("Task must contain points");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        String description = task.getDescription();

        if (description != null && description.length() > DESCRIPTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Profile author = util.checkProfile(profileAuthor);
        task.setProfileAuthor(author);
        if (profileAssignee != null) {
            Profile assignee = util.checkProfile(profileAssignee);
            task.setProfileAssignee(assignee);
        // setting profile assignee to author if no assignee is passed in
        } else {
            task.setProfileAssignee(author);
        }
        
        // Initialise the task to not started.
        task.setStatus(TASK_NOT_STARTED);
        task.setProject(project);

        return taskRepo.save(task);
    }

    /**
     * updates an existing task
     * throws error if task description is too long
     */
    public Task update(Task task, Long projectId, Long profileId, Long taskId, Long profileAssignee) {
        util.checkProfile(profileId);
        Project projectInDb = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, projectInDb);
        Task taskInDb = util.checkTask(taskId);
        util.isTaskInProject(projectId, taskId);

        // checking if task is passed in case only updating profile and not passing in task
        if (task != null) {
            String title = task.getTitle();
            if (title != null) {
                taskInDb.setTitle(title);
            }
    
            String description = task.getDescription();
            if (description.length() > DESCRIPTION_CHARACTER_LIMIT) {
                String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            } else {
                taskInDb.setDescription(description);
            }
    
            Date deadline = task.getDeadline();
            if (deadline != null) {
                taskInDb.setDeadline(deadline);
            }
    
            Integer points = task.getPoints();
            if (points != null) {
                taskInDb.setPoints(points);
            }
    
            Integer status = task.getStatus();
            
            if (status != null) {
                Long assigneeId = taskInDb.getProfileAssignee().getId();
                Long authorId = taskInDb.getProfileAuthor().getId();
    
                // Only the assignee and the author are able to change the status of the task
                if (profileId.equals(assigneeId) || profileId.equals(authorId)) {
                    // Get the status from the task in the db
                    Integer prevStatus = taskInDb.getStatus();
                    // Set it to the new status
                    taskInDb.setStatus(status);
                    // Use prev status and current status to determine how we need to update the user's points
                    updateProfilePoints(prevStatus, status, taskInDb.getProfileAssignee(), taskInDb.getPoints());
                } else {
                    String errorMessage = String.format("User %d must be the author or assignee to change the status of this task.", profileId);
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, errorMessage);
                }
                
            }
        }

        if (profileAssignee != null) {
            Profile assignee = util.checkProfile(profileAssignee);
            taskInDb.setProfileAssignee(assignee);
        }

        return taskRepo.save(taskInDb);
    }

    /**
     * function to update profile points
     * @param prevStatus
     * @param status
     * @param profileAssignee
     * @param points
     */
    private void updateProfilePoints(Integer prevStatus, Integer status, Profile profileAssignee, Integer points) {
        Integer currPoints = profileAssignee.getPoints();
        // When the task is complete we add the points to the profile, need to make sure that the 
        // task was not already complete.
        if (status == TASK_COMPLETE && prevStatus != TASK_COMPLETE) {
            profileAssignee.setPoints(currPoints + points);
        }
        
        // If the task is moved from complete to in progress or not started we remove the points from the profile
        if (prevStatus == TASK_COMPLETE && status != TASK_COMPLETE) {
            // Set the points to 0 if they're going to go into the negative (somehow)
            if (currPoints < points) {
                profileAssignee.setPoints(0);
            } else {
                profileAssignee.setPoints(currPoints - points);
            }
        }
    }

    /**
     * returns a task information given a task id
     */
    public Task getTask(Long projectId, Long taskId) {
        util.checkProject(projectId);
        util.isTaskInProject(projectId, taskId);
        return util.checkTask(taskId);
    }

    /**
     * deletes a task given a task id
     */
    public void delete(Long profileId, Long projectId, Long taskId) {
        util.checkProfile(profileId);

        Project project = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, project);
        
        Task task = util.checkTask(taskId);
        util.isTaskInProject(projectId, taskId);

        // have to detach tasks from project before removing
        project.getTasks().remove(task);
        util.isProfileAuthorOfTask(profileId, taskId);
        taskRepo.delete(task);
    }
}
