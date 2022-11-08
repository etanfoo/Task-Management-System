package com.redlions.backend.service;

import java.util.HashMap;
import java.util.List;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Task;

public interface ProfileService {
    Profile create(Profile profile);
    Profile update(Profile profile, Long id);
    Profile getProfile(String email);
    Profile getProfile(Long id);
    List<Profile> getProfiles();
    HashMap<String,Long> requestConnection(Long user_id, Long target_id);
    HashMap<String,Long> acceptConnection(Long user_id, Long target_id);
    HashMap<String,Long> rejectConnection(Long user_id, Long target_id);
    List<Profile> getAcceptedConnections(Long id);
    List<Profile> getRequestedConnections(Long id);
    List<Task> getAssignedTasks(Long id);
    List<Task> getAuthoredTasks(Long id);
}
