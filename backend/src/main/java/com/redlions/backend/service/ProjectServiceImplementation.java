package com.redlions.backend.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.redlions.backend.entity.Project;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImplementation implements ProjectService {

    @Override
    public Project create(Project project) {
        return null;
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
