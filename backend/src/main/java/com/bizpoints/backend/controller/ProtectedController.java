package com.bizpoints.backend.controller;

import com.bizpoints.backend.security.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for protected endpoints that require a valid JWT.
 */
@RestController
@RequestMapping("/api/protected")
@CrossOrigin(origins = "http://localhost:3000")
public class ProtectedController {

  private final JwtUtil jwtUtil;

  public ProtectedController(JwtUtil jwtUtil) { this.jwtUtil = jwtUtil; }

  /**
   * GET /api/protected/hello
   */
  @GetMapping("/hello")
  public ResponseEntity<String>
  hello(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Missing or invalid Authorization header");
    }

    String token = authHeader.substring(7);
    try {
      Claims claims = jwtUtil.parseToken(token);
      String userId = claims.getSubject();
      return ResponseEntity.ok("Hello, user " + userId +
                               "! This is protected data.");
    } catch (ExpiredJwtException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Token expired");
    } catch (JwtException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Invalid or expired token");
    }
  }
}