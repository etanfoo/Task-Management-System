package com.redlions.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.redlions.backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{
    
}
