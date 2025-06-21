package com.bizpoints.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizpoints.backend.dto.Credentials;
import com.bizpoints.backend.model.User;
import com.bizpoints.backend.repository.UserRepository;
import com.bizpoints.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

  private final UserRepository users;
  private final JwtUtil jwtUtil;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthController(UserRepository users, JwtUtil jwtUtil) {
    this.users = users;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Credentials creds) {
    if (users.findByEmail(creds.getEmail()) != null) {
      return ResponseEntity.status(409).body(
          Map.of("error", "Email already in use"));
    }
    User u = new User();
    u.setUsername(creds.getUsername());
    u.setEmail(creds.getEmail());
    u.setPassword(encoder.encode(creds.getPassword()));
    users.save(u);

    String token = jwtUtil.generateToken(u.getId());
    return ResponseEntity.ok(
        Map.of("token", token, "username", u.getUsername()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Credentials creds) {
    User found = users.findByEmail(creds.getEmail());
    if (found != null &&
        encoder.matches(creds.getPassword(), found.getPassword())) {
      String token = jwtUtil.generateToken(found.getId());
      return ResponseEntity.ok(
          Map.of("token", token, "username", found.getUsername()));
    }
    return ResponseEntity.status(401).body(
        Map.of("error", "Invalid credentials"));
  }
}
