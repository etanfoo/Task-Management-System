package com.redlions.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProfileServiceImplementation implements ProfileService, UserDetailsService {

    private final ProfileRepository profileRepo;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Profile profile = profileRepo.findByEmail(email);
        if (profile == null) {
            log.error("Profile not found in the database");
            throw new UsernameNotFoundException("Profile not found in the database");
        } else {
            log.info("Profile found in the database: {}", email);
        }
        // double check as this might have to change if we want different authorities
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(profile.getEmail(), profile.getPassword(), authorities);
    }

    @Override
    public Profile saveProfile(Profile profile) {
        /**
         * Used to create and update profiles.
         */
        String aboutMe = profile.getAboutMe();
        if (aboutMe.length() > 300) {
            String errorMessage = "\"About me\" section must be below 300 characters long.";
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        log.info("Saving new profile {} to database", profile.getEmail());
        // encrypting password to not save plain text in db
        profile.setPassword(passwordEncoder.encode(profile.getPassword()));
        return profileRepo.save(profile);
    }

    @Override
    public Profile getProfile(String email) {
        log.info("Fetching user {}", email);
        return profileRepo.findByEmail(email);
    }

    @Override
    public Profile getProfile(Long id) {
        log.info("Fetching user id={}", id);
        Profile profile = profileRepo.findById(id).stream().findFirst().orElse(null); // convert Optional<Profile> to Profile
        if (profile == null) {
            String errorMessage = String.format("User with id %d does not exist.", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        return profile;
    }

    @Override
    public List<Profile> getProfiles() {
        log.info("Fetching all users");
        return profileRepo.findAll();
    }
}
