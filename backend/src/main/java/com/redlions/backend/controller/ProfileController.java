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
import com.redlions.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@CrossOrigin
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Profile> findAll() {
        return profileService.getProfiles();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Profile findById(@PathVariable("id") long id) {
        return profileService.getProfile(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody Profile profile, @PathVariable Long id) {
        profileService.update(profile, id);
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.create(profile);
    }

    @PostMapping("/connect/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>> requestConnection(@PathVariable("id") long user_id, @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.requestConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
            response,
            HttpStatus.OK);
        
    }

    @PostMapping("/accept/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>>  acceptConnection(@PathVariable("id") long user_id, @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.acceptConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
            response,
            HttpStatus.OK);
        
    }

    @PostMapping("/reject/{id}/{id2}")
    @ResponseBody
    public ResponseEntity<HashMap<String, Long>> rejectConnection(@PathVariable("id") long user_id, @PathVariable("id2") long target_id) {
        HashMap<String, Long> response = profileService.rejectConnection(user_id, target_id);
        return new ResponseEntity<HashMap<String, Long>>(
            response,
            HttpStatus.OK);
        
    }
}
