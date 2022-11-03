package com.redlions.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
import com.redlions.backend.entity.Project;
import com.redlions.backend.entity.Task;
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
    private final int MIN_PASSWORD_LENGTH = 6;
    private final Integer NO_FACE_PROVIDED = null;
    private final int STRESSED_FACE = 0;
    private final int WORRIED_FACE = 1;
    private final int NEUTRAL_FACE = 2;
    private final int COMFORTABLE_FACE = 3;
    private final int HAPPY_FACE = 4;

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
        return new org.springframework.security.core.userdetails.User(profile.getEmail(), profile.getPassword(),
                authorities);
    }

    @Override
    public Profile create(Profile profile) {
        /**
         * Create a profile and save it to database.
         * To create a profile, username and password is required.
         */

        // Change all stored emails to lower case
        String email = profile.getEmail().toLowerCase();
        profile.setEmail(email);

        String password = profile.getPassword();
        if (!isValidEmail(email)) {
            String errorMessage = "A valid email is required for creating a profile.";
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }
        if (!isValidPassword(password)) {
            String errorMessage = "A valid password is required for creating a profile.";
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        if (!isValidHappiness(profile.getHappiness())) {
            String errorMessage = String.format("\"Happiness\" value must be %d, %d, %d, %d, %d or %d",
                    NO_FACE_PROVIDED, STRESSED_FACE, WORRIED_FACE, NEUTRAL_FACE, COMFORTABLE_FACE, HAPPY_FACE);
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
                String errorMessage = String.format("\"About me\" section must be below %d characters long.",
                        ABOUT_ME_SECTION_CHARACTER_LIMIT);
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
        if (password != null && isValidPassword(password)) {
            // encrypting password to not save plain text in db
            // setting password
            profileInDb.setPassword(passwordEncoder.encode(password));
        }

        Integer happiness = profile.getHappiness();
        if (isValidHappiness(happiness)) {
            profileInDb.setHappiness(happiness);
        } else {
            String errorMessage = String.format(
                    "\"Happiness\" value must be %d (NO_FACE_PROVIDED), %d (STRESSED_FACE), %d (WORRIED_FACE), %d (NEUTRAL_FACE), %d (COMFORTABLE_FACE) or %d (HAPPY_FACE)",
                    NO_FACE_PROVIDED, STRESSED_FACE, WORRIED_FACE, NEUTRAL_FACE, COMFORTABLE_FACE, HAPPY_FACE);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
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
        Profile profile = profileRepo.findById(id).stream().findFirst().orElse(null); // convert Optional<Profile> to
                                                                                      // Profile
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

    @Override
    public List<Task> getAssociatedTasks(Long id) {
        Profile profile = util.checkProfile(id);
        List<Task> allTasks = new ArrayList<Task>();
        Set<Project> projectsSet = profile.getProjects();
        for (Project project : projectsSet) {
            Set<Task> projectTasks = project.getTasks();
            for (Task task : projectTasks) {
                allTasks.add(task);
            }
        }
        return allTasks;
    }

    private boolean isValidPassword(String password) {

        if (password.length() < MIN_PASSWORD_LENGTH) { // Password length must be > 6 characters
            return false;
        }
        Boolean has_uppercase = false; // Password must contain at least one of these
        Boolean has_lowercase = false;
        Boolean has_special_character = false;
        Boolean has_number = false;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isUpperCase(ch)) {
                has_uppercase = true;
            }
            if (Character.isLowerCase(ch)) {
                has_lowercase = true;
            }
            if (Character.isDigit(ch)) {
                has_number = true;
            }
            if (isSpecialCharacter(ch)) {
                has_special_character = true;
            }
        }

        return has_uppercase && has_lowercase && has_number && has_special_character;
    }

    private boolean isSpecialCharacter(char ch) {
        // ascii ! " # $ % & ' ( ) * + , - .
        return ch >= 33 && ch <= 46;
    }

    private boolean isValidEmail(String email) {
        Pattern EMAIL_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        Matcher match_email = EMAIL_REGEX.matcher(email);
        return match_email.find();
    }

    private boolean isValidHappiness(Integer happiness) {
        return happiness == NO_FACE_PROVIDED
                || happiness == STRESSED_FACE
                || happiness == WORRIED_FACE
                || happiness == NEUTRAL_FACE
                || happiness == COMFORTABLE_FACE
                || happiness == HAPPY_FACE;
    }

    @Override
    public HashMap<String, Long> requestConnection(Long user_id, Long target_id) {

        // Check if the users exist first before making a connection between them.

        // userProfile is the user that is making the request for the connection.
        Profile userProfile = util.checkProfile(user_id);

        // targetProfile is the user that will be receiving the connection request.
        Profile targetProfile = util.checkProfile(target_id);

        // Throw error if this request has already been made
        Set<Profile> targetRequests = targetProfile.getRequestedConnections();
        if (targetRequests.contains(userProfile)) {
            String errorMessage = String.format("Connection request with user id %d has already been made.", target_id);
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, errorMessage);
        }

        // Throw error if the user already has a request from the target.
        Set<Profile> userRequests = userProfile.getRequestedConnections();
        if (userRequests.contains(targetProfile)) {
            String errorMessage = String.format("Connection request with user id %d has already been made.", user_id);
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, errorMessage);
        }

        // Throw error if the user already has a connection with the target.
        Set<Profile> targetConnections = targetProfile.getAcceptedConnections();
        if (targetConnections.contains(userProfile)) {
            String errorMessage = String.format("Connection with user id %d already exists.", target_id);
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, errorMessage);
        }

        // Throw error if the user already has a connection with the target.
        Set<Profile> userConnections = userProfile.getAcceptedConnections();
        if (userConnections.contains(targetProfile)) {
            String errorMessage = String.format("Connection with user id %d already exists.", user_id);
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, errorMessage);
        }

        targetProfile.addRequestedConnection(userProfile);

        HashMap<String, Long> response = new HashMap<>();
        response.put("user_id", user_id);
        response.put("target_id", target_id);

        return response;

    }

    @Override
    public HashMap<String, Long> acceptConnection(Long user_id, Long target_id) {
        // Check if the users exist first before making a connection between them.

        // userProfile is the user that is accepting the request for the connection.
        Profile userProfile = util.checkProfile(user_id);

        // targetProfile is the user that made the connection request to the
        // userProfile.
        Profile targetProfile = util.checkProfile(target_id);

        // User cannot accept a request that was never made
        Set<Profile> userProfileRequests = userProfile.getRequestedConnections();
        if (!userProfileRequests.contains(targetProfile)) {
            String errorMessage = String.format("No connection request exists from user %d.", target_id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        // Add the connection to both of the user's connections
        userProfile.addAcceptedConnection(targetProfile);
        targetProfile.addAcceptedConnection(userProfile);

        // userProfile will remove the connection request.
        userProfile.removeRequestedConnection(targetProfile);
        targetProfile.removeRequestedConnection(userProfile);

        HashMap<String, Long> response = new HashMap<>();
        response.put("user_id", user_id);
        response.put("target_id", target_id);

        return response;

    }

    @Override
    public HashMap<String, Long> rejectConnection(Long user_id, Long target_id) {
        // userProfile is the user that is rejecting the request for the connection.
        Profile userProfile = util.checkProfile(user_id);

        // targetProfile is the user that made the connection request to the
        // userProfile.
        Profile targetProfile = util.checkProfile(target_id);

        // User cannot reject a request that was never made
        Set<Profile> userProfileRequests = userProfile.getRequestedConnections();
        if (!userProfileRequests.contains(targetProfile)) {
            String errorMessage = String.format("No connection request exists from user %d.", target_id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        userProfile.removeRequestedConnection(targetProfile);

        HashMap<String, Long> response = new HashMap<>();
        response.put("user_id", user_id);
        response.put("target_id", target_id);

        return response;

    }

    @Override
    public List<Profile> getAcceptedConnections(Long id) {
        Profile profile = util.checkProfile(id);
        Set<Profile> profileSet = profile.getAcceptedConnections();
        return profileSet.stream().collect(Collectors.toList());
    }

    @Override
    public List<Profile> getRequestedConnections(Long id) {
        Profile profile = util.checkProfile(id);
        Set<Profile> profileSet = profile.getRequestedConnections();
        return profileSet.stream().collect(Collectors.toList());
    }
}
