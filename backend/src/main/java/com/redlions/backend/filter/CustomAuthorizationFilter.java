package com.redlions.backend.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // add signup route
        if (request.getServletPath().equals("/api/v1/profile/login") || request.getServletPath().equals("/api/v1/profile/signup")) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            String bearer = "Bearer ";
            if (authorizationHeader != null && authorizationHeader.startsWith(bearer)) {
                try {
                    String token = authorizationHeader.substring(bearer.length());
                    // can change secret later if needed
                    Algorithm algorithm = Algorithm.HMAC256("mySuperSecret".getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String email = decodedJWT.getSubject();
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority("PERMITTED"));
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch(Exception exception) {
                    log.error("Error logging in: {}", exception.getMessage());
                    response.setHeader("error", exception.getMessage());
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    // response.sendError(HttpStatus.FORBIDDEN.value());
                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", exception.getMessage());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
        
    }
    
}
