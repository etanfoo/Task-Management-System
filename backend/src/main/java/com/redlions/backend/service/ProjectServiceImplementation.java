package com.redlions.backend.service;

import java.util.List;
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
        util.checkProject(projectId);
        Project project = util.checkProject(projectId);
        return project.getTasks();
    }
}
