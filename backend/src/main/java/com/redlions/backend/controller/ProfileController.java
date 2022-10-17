package com.redlions.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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


    @PostMapping("/connect/{id}")
    @ResponseStatus(HttpStatus.OK)
    public long requestConnection(@RequestBody Profile profile, @PathVariable("id") long id) {
        return profileService.requestConnection(profile, id);
    }

    @PostMapping("/connect/{id}")
    @ResponseStatus(HttpStatus.OK)
    public long acceptConnection(@RequestBody Profile profile, @PathVariable("id") long id) {
        return profileService.acceptConnection(profile, id);
    }

    @PostMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public long rejectConnection(@RequestBody Profile profile, @PathVariable("id") long id) {
        return profileService.rejectConnection(profile, id);
    }
}
