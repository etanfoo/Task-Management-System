package com.redlions.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
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
    public void update(@PathVariable("profile") Profile profile) {
        profileService.saveProfile(profile);
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }
}
