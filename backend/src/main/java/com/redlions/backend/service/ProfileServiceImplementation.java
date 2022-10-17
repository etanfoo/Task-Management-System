package com.redlions.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

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
import com.redlions.backend.util.Util;

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
    private final Util util;
    
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
    public Profile update(Profile profile, Long id) {
        /**
         * Update an existing profile.
         */
        Profile profileInDb = profileRepo.findById(id).get();

        String aboutMe = profile.getAboutMe();
        if (aboutMe != null) {
            if (aboutMe.length() > ABOUT_ME_SECTION_CHARACTER_LIMIT) {
                String errorMessage = String.format("\"About me\" section must be below %d characters long.", ABOUT_ME_SECTION_CHARACTER_LIMIT);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            } else {
                // setting about me
                profileInDb.setAboutMe((aboutMe));
            }
        }
        
        String name = profile.getName();
        if (name != null) {
            profileInDb.setName(name);
        }

        String password = profile.getPassword();
        if (password != null) {
            // encrypting password to not save plain text in db
            // setting password
            profileInDb.setPassword(passwordEncoder.encode(password));
        }

        String profilePicture = profile.getProfilePicture();
        if (profilePicture != null) {
            // setting profile picture
            profileInDb.setProfilePicture(profilePicture);
        }

        log.info("Updating profile {}", profileInDb.getEmail());
        return profileRepo.save(profileInDb);
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

    @Override
    public void requestConnection(Long user_id, Long target_id) {

        // Check if the users exist first before making a connetion between them.

        // userProfile is the user that is making the request for the connection.
        Profile userProfile = util.checkProfile(user_id);

        // targetProfile is the user that will be receiving the connection request.
        Profile targetProfile = util.checkProfile(target_id);

        // The target profile gets a request from the user that made the connection request

        // Throw error if this request has already been made
        Set<Profile> targetRequests = targetProfile.getRequestedConnections();
        if(targetRequests.contains(userProfile)) {
            String errorMessage = String.format("Connection request with user id %d has already been made.", target_id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        // Throw error if the user already has a request from the target
        Set<Profile> userRequests = userProfile.getRequestedConnections();
        if(userRequests.contains(targetProfile)) {
            String errorMessage = String.format("Connection request with user id %d has already been made.", target_id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        targetProfile.addRequestedConnection(userProfile);
    }

    @Override
    public void acceptConnection(Long user_id, Long target_id) {
        // Check if the users exist first before making a connetion between them.

        // userProfile is the user that is accepting the request for the connection.
        Profile userProfile = util.checkProfile(user_id);

        // targetProfile is the user that made the connection to the userProfile.
        Profile targetProfile = util.checkProfile(target_id);

        // userProfile will add the connection to their connections.
        Set<Profile> connections = userProfile.getAcceptedConnections();
        if(connections.contains(targetProfile)) {
            String errorMessage = String.format("Connection with user id %d already exists.", target_id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        // Add the connection to both of the user's connections
        userProfile.addAcceptedConnection(targetProfile);
        targetProfile.addAcceptedConnection(userProfile);

        // userProfile will remove the connection request.
        userProfile.removeRequestedConnection(targetProfile);
        targetProfile.removeRequestedConnection(userProfile);
    }
}
