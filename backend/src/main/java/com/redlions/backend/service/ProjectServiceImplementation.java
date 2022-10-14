package com.redlions.backend.service;

import java.util.List;
import java.util.Set;

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

    @Override
    public Project create(Project project, Long profileId) {
        Profile profile = profileRepo.findById(profileId).stream().findFirst().orElse(null);
        if (profile == null) {
            String errorMessage = String.format("User with id %d does not exist.", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        
        if (project.getTitle() == null) {
            String errorMessage = String.format("Project must contain a title", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        String description = project.getDescription();
        if (description != null && description.length() > DESCRIPTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"Description\" section must be below %d characters long.", DESCRIPTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        project.addProfile(profile);
        return projectRepo.save(project);
    }
    
    @Override
    public Project update(Project project, Long projectId, Long profileId) {
        Profile profile = profileRepo.findById(profileId).stream().findFirst().orElse(null);
        if (profile == null) {
            String errorMessage = String.format("User with id %d does not exist.", profileId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        Project projectInDb = projectRepo.findById(projectId).stream().findFirst().orElse(null);
        if (projectInDb == null) {
            String errorMessage = String.format("Project with id %d does not exist.", projectId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        // checking if profile passed in is a member of the project
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

        return projectRepo.save(projectInDb);
    }

    @Override
    public Project getProject(Long id) {
        Project project = projectRepo.findById(id).stream().findFirst().orElse(null); // convert Optional<Profile> to Profile
        if (project == null) {
            String errorMessage = String.format("Project with id %d does not exist.", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return project;
    }

    @Override
    public void delete(Long id) {
        Project project = projectRepo.findById(id).stream().findFirst().orElse(null); // convert Optional<Profile> to Profile
        if (project == null) {
            String errorMessage = String.format("Project with id %d does not exist.", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        projectRepo.delete(project);
    }

    @Override
    public List<Project> getProjects() {
        return null;
    }
}
