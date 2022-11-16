package com.redlions.backend.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redlions.backend.entity.Profile;
import com.redlions.backend.repository.ProfileRepository;

import lombok.Data;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final ProfileRepository profileRepository;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager,
            ProfileRepository profileRepository) {
        this.authenticationManager = authenticationManager;
        this.profileRepository = profileRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        // This is to parse JSON in body
        try {
            BufferedReader reader = request.getReader();
            StringBuffer sb = new StringBuffer();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String parsedReq = sb.toString();
            if (parsedReq != null) {
                ObjectMapper mapper = new ObjectMapper();
                AuthReq authReq = mapper.readValue(parsedReq, AuthReq.class);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        authReq.getEmail(), authReq.getPassword());
                return authenticationManager.authenticate(authenticationToken);
            }
        } catch (Exception e) {
            throw new InternalAuthenticationServiceException("Failed to parse authentication request body");
        }
        return null;
    }

    @Data
    public static class AuthReq {
        String email;
        String password;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {
        User user = (User) authentication.getPrincipal();
        // can change secret later if needed
        Algorithm algorithm = Algorithm.HMAC256("mySuperSecret".getBytes());
        String accessToken = JWT.create()
                .withSubject(user.getUsername())
                // currently set timeout to 24 hour
                .withExpiresAt(new Date(System.currentTimeMillis() + 1440 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                // can change if want to add roles later
                // .withClaim("temp",
                // user.getAuthorities().stream().map(GrantedAuthority::getAuthority)).collect(Collectors.toList())
                .sign(algorithm);

        // add in later if we want to use refresh token, have to add endpoint in as well
        // String refreshToken = JWT.create()
        // .withSubject(user.getUsername())
        // // currently set refresh timeout to 24 hours
        // .withExpiresAt(new Date(System.currentTimeMillis() + 1440 * 60 * 1000))
        // .withIssuer(request.getRequestURL().toString())
        // // can change if want to add roles later
        // // .withClaim("temp",
        // user.getAuthorities().stream().map(GrantedAuthority::getAuthority)).collect(Collectors.toList())
        // .sign(algorithm);
        Profile profile = profileRepository.findByEmail(user.getUsername());
        Map<String, Object> returnedJson = new HashMap<>();
        returnedJson.put("access_token", accessToken);
        returnedJson.put("profile_id", profile.getId());
        // tokens.put("refresh_token", refreshToken);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), returnedJson);
    }
}
