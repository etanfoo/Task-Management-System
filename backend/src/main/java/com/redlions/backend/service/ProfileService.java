package com.redlions.backend.service;

import java.util.List;

import com.redlions.backend.entity.Profile;

public interface ProfileService {
    Profile create(Profile profile);
    Profile update(Profile profile, Long id);
    Profile getProfile(String email);
    Profile getProfile(Long id);
    List<Profile> getProfiles();
    void requestConnection(Long user_id, Long target_id);
    void acceptConnection(Long user_id, Long target_id);
}
