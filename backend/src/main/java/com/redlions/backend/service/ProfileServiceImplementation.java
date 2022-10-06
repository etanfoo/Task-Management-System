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
import org.springframework.web.server.ResponseStatusException;

import com.redlions.backend.entity.Profile;
import com.redlions.backend.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProfileServiceImplementation implements ProfileService, UserDetailsService {

    private final ProfileRepository profileRepo;
    private final PasswordEncoder passwordEncoder;
    private final int ABOUT_ME_SECTION_CHARACTER_LIMIT = 300;
    
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
    public Profile create(Profile profile) {
        /**
         * Create a profile and save it to database.
         * To create a profile, username and password is required.
         */
        String email = profile.getEmail();
        String password = profile.getPassword();
        if (!isValidEmail(email) || !isValidPassword(password)) {
            String errorMessage = "A valid email and password is required for creating a profile.";
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        Profile existingProfile = profileRepo.findByEmail(email);
        if (existingProfile != null) {
            String errorMessage = "A profile with that email is already in use.";
            throw new ResponseStatusException(HttpStatus.CONFLICT, errorMessage);
        }
        log.info("Saving new profile {} to database", email);
        // encrypting password to not save plain text in db
        profile.setPassword(passwordEncoder.encode(password));
        return profileRepo.save(profile);
    }

    @Override
    public Profile update(Profile profile) {
        /**
         * Update an existing profile.
         */
        String aboutMe = profile.getAboutMe();
        if (aboutMe != null && aboutMe.length() > ABOUT_ME_SECTION_CHARACTER_LIMIT) {
            String errorMessage = String.format("\"About me\" section must be below %d characters long.", ABOUT_ME_SECTION_CHARACTER_LIMIT);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        log.info("Updating profile {}", profile.getEmail());
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

    private boolean isValidPassword(String password) {
        // TODO
        return password != null && !password.isEmpty();
    }

    private boolean isValidEmail(String email) {
        // TODO
        return email != null && !email.isEmpty();
    }
}
