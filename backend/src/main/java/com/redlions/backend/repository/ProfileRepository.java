package com.redlions.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.redlions.backend.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByEmail(String email);
}
