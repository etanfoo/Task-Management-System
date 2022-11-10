package com.redlions.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;
import com.redlions.backend.repository.ProjectRepository;
import com.redlions.backend.util.Util;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImplementation implements ProjectService {
    private final ProjectRepository projectRepo;
    private final Util util;
    private final int DESCRIPTION_CHARACTER_LIMIT = 1000;


    /**
     * create a project and save it to database
     * profileId passed through is automatically added to the project
     * throws an error if project does not contain a title or description is too long
     */
    @Override
    public Project create(Project project, Long profileId, Set<Long> profileIdsToAdd) {
        Profile profile = util.checkProfile(profileId);
        
        if (project.getTitle() == null) {
            String errorMessage = String.format("Project must contain a title");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        String description = project.getDescription();
        if (description != null && description.length() > DESCRIPTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Set<Profile> profiles = util.getProfilesFromIds(profileIdsToAdd);
        for (Profile currProfile: profiles) {
            project.addProfile(currProfile);
        }
        project.addProfile(profile);
        return projectRepo.save(project);
    }
    
    /**
     * update an existing project given a project id 
     * throws error if description is too long
     */
    @Override
    public Project update(Project project, Long projectId, Long profileId, Set<Long> profileIdsToAdd) {
        util.checkProfile(profileId);
        Project projectInDb = util.checkProject(projectId);

        util.isProfileInProject(profileId, projectId, projectInDb);
        
        String title = project.getTitle();
        if (title != null) {
            projectInDb.setTitle(title);
        }

        String description = project.getDescription();
        if (description != null) {
            if (description.length() > DESCRIPTION_CHARACTER_LIMIT) {
                String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            } else {
                projectInDb.setDescription(description);
            }
        }

        Set<Profile> newProfiles = util.getProfilesFromIds(profileIdsToAdd);
        for (Profile currProfile: newProfiles) {
            projectInDb.addProfile(currProfile);
        }

        return projectRepo.save(projectInDb);
    }

    /**
     * returns project information given a project id
     */
    @Override
    public Project getProject(Long id) {
        return util.checkProject(id);
    }

    /**
     * deletes a project given a project id
     */
    @Override
    public void delete(Long projectId, Long profileId) {
        util.checkProfile(profileId);
        Project project = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, project);
        projectRepo.delete(project);
    }

    /**
     * removes multiple profiles from a project given a set of profile id's
     */
    @Override
    public void removeProfilesFromProject(Long projectId, Long profileId, Set<Long> profileIds) {
        util.checkProfile(profileId);
        Project projectInDb = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, projectInDb);

        Set<Profile> profilesToDelete = util.getProfilesFromIds(profileIds);
        for (Profile currProfile: profilesToDelete) {
            projectInDb.removeProfile(currProfile);
        }
    }

    /**
     * removes single profile from a project given a profile id
     */
    @Override
    public void removeProfileFromProject(Long projectId, Long profileId, Long profileIdToRemove) {
        util.checkProfile(profileId);
        Project projectInDb = util.checkProject(projectId);
        util.isProfileInProject(profileId, projectId, projectInDb);

        Profile profileToRemove = util.checkProfile(profileIdToRemove);
        projectInDb.removeProfile(profileToRemove);
    }

    /**
     * returns projects associated with a profile given a profile id
     */
    @Override
    public List<Project> getAssociatedProjects(Long profileId) {
        Profile profile = util.checkProfile(profileId);
        Set<Project> projectsSet = profile.getProjects();
        return projectsSet.stream().collect(Collectors.toList());
    }

    /**
     * returns all tasks associated with a project
     */
    @Override
    public Set<Task> getProjectTasks(Long projectId) {
        Project project = util.checkProject(projectId);
        return project.getTasks();
    }

    /**
     * return all statistics for a given project
     */
    @Override
    public Object getProjectStatistics(Long projectId) {
        Project project = util.checkProject(projectId);
        Map<String, Object> statistics = new HashMap<String, Object>();

        Map<String, Integer> tasks = new HashMap<String, Integer>();
        tasks.put("completed", 0);
        tasks.put("not_started", 0);
        tasks.put("in_progress", 0);
        tasks.put("blocked", 0);

        Map<String, Integer> happiness = new HashMap<String, Integer>();
        happiness.put("no_face", 0);
        happiness.put("stressed", 0);
        happiness.put("worried", 0);
        happiness.put("neutral", 0);
        happiness.put("comfortable", 0);
        happiness.put("happy", 0);

        Map<String, Float> busyness = new HashMap<String, Float>();
        busyness.put("0-10", 0f);
        busyness.put("10-20", 0f);
        busyness.put("20-30", 0f);
        busyness.put("30-40", 0f);
        busyness.put("40-50", 0f);
        busyness.put("50-60", 0f);
        busyness.put("60-70", 0f);
        busyness.put("70-80", 0f);
        busyness.put("80-90", 0f);
        busyness.put("90-100", 0f);
        busyness.put("100+", 0f);

        // tallying up tasks
        for (Task task: project.getTasks()) {
            Integer status = task.getStatus();
            if (status == util.TASK_COMPLETE) {
                tasks.put("completed", tasks.get("completed") + 1);
            } else if (status == util.TASK_NOT_STARTED) {
                tasks.put("not_started", tasks.get("not_started") + 1);
            } else if (status == util.TASK_IN_PROGRESS) {
                tasks.put("in_progress", tasks.get("in_progress") + 1);
            } else if (status == util.TASK_BLOCKED) {
                tasks.put("blocked", tasks.get("blocked") + 1);
            } else {
                String errorMessage = String.format("Task with task id %d does not have a correct status", task.getId());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            }
        }

        // tallying up profile happiness and busyness
        for (Profile profile: project.getProfiles()) {
            Integer happinessLevel = profile.getHappiness();
            Float busynessLevel = profile.getBusyness();
            System.out.println(happinessLevel);
            System.out.println(busynessLevel);
            if (busynessLevel <= 10) {
                busyness.put("0-10", busyness.get("0-10") + 1);
            } else if (busynessLevel <= 20) {
                busyness.put("10-20", busyness.get("10-20") + 1);
            } else if (busynessLevel <= 30) {
                busyness.put("20-30", busyness.get("20-30") + 1);
            } else if (busynessLevel <= 40) {
                busyness.put("30-40", busyness.get("30-40") + 1);
            } else if (busynessLevel <= 50) {
                busyness.put("40-50", busyness.get("40-50") + 1);
            } else if (busynessLevel <= 60) {
                busyness.put("50-60", busyness.get("50-60") + 1);
            } else if (busynessLevel <= 70) {
                busyness.put("60-70", busyness.get("60-70") + 1);
            } else if (busynessLevel <= 80) {
                busyness.put("70-80", busyness.get("70-80") + 1);
            } else if (busynessLevel <= 90) {
                busyness.put("80-90", busyness.get("80-90") + 1);
            } else if (busynessLevel <= 100) {
                busyness.put("90-100", busyness.get("90-100") + 1);
            } else {
                busyness.put("100+", busyness.get("100+") + 1);
            }
        }

        statistics.put("tasks", tasks);
        statistics.put("happiness", happiness);
        statistics.put("busyness", busyness);
        return statistics;
    }
}
