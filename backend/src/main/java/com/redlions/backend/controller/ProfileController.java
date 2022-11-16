package com.redlions.backend.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.entity.Task;
import com.redlions.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@CrossOrigin
public class ProfileController {
    private final ProfileService profileService;

    /**
     * get mapping to return all profiles
     * 
     * @return
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Profile> findAll() {
        return profileService.getProfiles();
    }

    /**
     * get mapping to return a single profile given an id
     * 
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Profile findById(@PathVariable("id") long id) {
        return profileService.getProfile(id);
    }

    /**
     * put mapping to update a profile given an id
     */
    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody Profile profile, @PathVariable Long id) {
        profileService.update(profile, id);
    }

    /**
     * post mapping to add a new profile to the database
     */
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.create(profile);
    }

    /**
     * post mapping to send a connect request between 2 profiles
     * 
     * @param user_id
     * @param target_id
     * @return
     */
    @PostMapping("/connect/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>> requestConnection(@PathVariable("id") long user_id,
            @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.requestConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
                response,
                HttpStatus.OK);

    }

    /**
     * post mapping to accept a connect request between 2 profiles
     * 
     * @param user_id
     * @param target_id
     * @return
     */
    @PostMapping("/accept/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>> acceptConnection(@PathVariable("id") long user_id,
            @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.acceptConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
                response,
                HttpStatus.OK);

    }

    /**
     * post mapping to reject a connect request between 2 profiles
     * 
     * @param user_id
     * @param target_id
     * @return
     */
    @PostMapping("/reject/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>> rejectConnection(@PathVariable("id") long user_id,
            @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.rejectConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
                response,
                HttpStatus.OK);

    }

    /**
     * get mapping to return all accepted connections for a single profile
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}/acceptedConnections")
    @ResponseStatus(HttpStatus.OK)
    public List<Profile> getAcceptedConnections(@PathVariable Long id) {
        return profileService.getAcceptedConnections(id);
    }

    /**
     * get mapping to return all requested connections for a single profile
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}/requestedConnections")
    @ResponseStatus(HttpStatus.OK)
    public List<Profile> getRequestedConnections(@PathVariable Long id) {
        return profileService.getRequestedConnections(id);
    }

    /**
     * get mapping to return all assigned task for a single profile
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}/assignedTasks")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getAssignedTasks(@PathVariable Long id) {
        return profileService.getAssignedTasks(id);
    }
}
