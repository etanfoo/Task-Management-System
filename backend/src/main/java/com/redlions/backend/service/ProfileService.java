package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Profile;

public interface ProfileService {
    Profile saveProfile(Profile profile);
    Profile getProfile(String email);
    Profile getProfile(Long id);
    List<Profile> getProfiles();
}
