package com.bizpoints.backend.controller;

import com.bizpoints.backend.dto.Credentials;
import com.bizpoints.backend.model.User;
import com.bizpoints.backend.repository.UserRepository;
import com.bizpoints.backend.security.JwtUtil;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    // 1) email unique?
    if (users.findByEmail(creds.getEmail()) != null) {
      return ResponseEntity.status(409).body(
          Map.of("error", "Email already in use"));
    }
    // 2) save new user
    User u = new User();
    u.setEmail(creds.getEmail());
    u.setPassword(encoder.encode(creds.getPassword()));
    users.save(u);

    // 3) issue a token and return it in JSON
    String token = jwtUtil.generateToken(u.getId());
    return ResponseEntity.ok(Map.of("token", token));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Credentials creds) {
    User found = users.findByEmail(creds.getEmail());
    if (found != null &&
        encoder.matches(creds.getPassword(), found.getPassword())) {
      String token = jwtUtil.generateToken(found.getId());
      return ResponseEntity.ok(Map.of("token", token));
    }
    return ResponseEntity.status(401).body(
        Map.of("error", "Invalid credentials"));
  }
}