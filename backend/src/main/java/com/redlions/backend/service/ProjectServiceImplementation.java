package com.redlions.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Project;
import com.redlions.backend.repository.ProfileRepository;
import com.redlions.backend.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImplementation implements ProjectService {
    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;
    private final int DESCRIPTION_CHARACTER_LIMIT = 1000;

    /**
     * checks if profile with corresponding id exists
     * throws http error if it doesn't
     * @param profileId
     * @return
     */
    private Profile checkProfile(Long profileId) {
        Profile profile = profileRepo.findById(profileId).stream().findFirst().orElse(null);
        if (profile == null) {
            String errorMessage = String.format("User with id %d does not exist.", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return profile;
    }

    /**
     * checks if project with corresponding id exists
     * throws http error if it doesn't
     * @param projectId
     * @return
     */
    private Project checkProject(Long projectId) {
        Project project = projectRepo.findById(projectId).stream().findFirst().orElse(null); // convert Optional<Profile> to Profile
        if (project == null) {
            String errorMessage = String.format("Project with id %d does not exist.", projectId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return project;
    }

    /**
     * checks if profile is in a project
     * throws an http error if profile is not a member
     * @param profileId
     * @param projectId
     * @param projectInDb
     */
    private void isProfileInProject(Long profileId, Long projectId, Project projectInDb) {
        Set<Profile> profiles = projectInDb.getProfiles();
        boolean found = false;
        for (Profile p: profiles) {
            if (p.getId() == profileId) {
                found = true;
            }
        }
        if (found == false) {
            String errorMessage = String.format("Profile with profile id %d is not a member of Project with id %d.", profileId, projectId);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, errorMessage);
        }
    }

    /**
     * loops through a set of id's and returns corresponding objects
     * throws an http error if any id not found
     * @param profileIdsToAdd
     * @return
     */
    private Set<Profile> getProfilesFromIds(Set<Long> profileIdsToAdd) {
        Set<Profile> profiles = new HashSet<>();
        for (Long currProfileId: profileIdsToAdd) {
            Profile currProfile = profileRepo.findById(currProfileId).stream().findFirst().orElse(null);
            if (currProfile == null) {
                String errorMessage = String.format("Profile with id %d does not exist.", currProfileId);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            } else {
                profiles.add(currProfile);
            }
        }
        return profiles;
    }

    @Override
    public Project create(Project project, Long profileId, Set<Long> profileIdsToAdd) {
        Profile profile = checkProfile(profileId);
        
        if (project.getTitle() == null) {
            String errorMessage = String.format("Project must contain a title", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        String description = project.getDescription();
        if (description != null && description.length() > DESCRIPTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        Set<Profile> profiles = getProfilesFromIds(profileIdsToAdd);
        for (Profile currProfile: profiles) {
            project.addProfile(currProfile);
        }
        project.addProfile(profile);
        return projectRepo.save(project);
    }
    
    @Override
    public Project update(Project project, Long projectId, Long profileId, Set<Long> profileIdsToAdd) {
        checkProfile(profileId);
        Project projectInDb = checkProject(projectId);

        isProfileInProject(profileId, projectId, projectInDb);
        
        String title = project.getTitle();
        if (title != null ) {
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

        
        Set<Profile> newProfiles = getProfilesFromIds(profileIdsToAdd);
        for (Profile currProfile: newProfiles) {
            projectInDb.addProfile(currProfile);
        }

        return projectRepo.save(projectInDb);
    }

    @Override
    public Project getProject(Long id) {
        return checkProject(id);
    }

    @Override
    public void delete(Long id) {
        Project project = checkProject(id);
        projectRepo.delete(project);
    }

    @Override
    public void removeProfilesFromProject(Long projectId, Long profileId, Set<Long> profileIds) {
        checkProfile(profileId);
        Project projectInDb = checkProject(projectId);
        isProfileInProject(profileId, projectId, projectInDb);

        Set<Profile> profilesToDelete = getProfilesFromIds(profileIds);
        for (Profile currProfile: profilesToDelete) {
            projectInDb.removeProfile(currProfile);
        }
    }

    @Override
    public List<Project> getAssociatedProjects(Long profileId) {
        Profile profile = checkProfile(profileId);
        Set<Project> projectsSet = profile.getProjects();
        return projectsSet.stream().collect(Collectors.toList());
    }
}
