package com.redlions.backend.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Project;
import com.redlions.backend.repository.ProfileRepository;
import com.redlions.backend.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Util {
    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;

    /**
     * checks if profile with corresponding id exists
     * throws http error if it doesn't
     * @param profileId
     * @return
     */
    public Profile checkProfile(Long profileId) {
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
    public Project checkProject(Long projectId) {
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
    public void isProfileInProject(Long profileId, Long projectId, Project projectInDb) {
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
    public Set<Profile> getProfilesFromIds(Set<Long> profileIdsToAdd) {
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
}
