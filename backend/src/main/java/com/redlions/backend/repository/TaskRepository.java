package com.redlions.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.redlions.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
