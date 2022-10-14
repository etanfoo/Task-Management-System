package com.redlions.backend.service;

import java.util.List;

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
    private final int DESCRIPTION_CHARACTER_LIMIT = 300;

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
    public Project update(Project project, Long id) {
        return null;
    }

    @Override
    public Project getProject(Long id) {
        return null;
    }

    @Override
    public List<Project> getProjects() {
        return null;
    }
}
