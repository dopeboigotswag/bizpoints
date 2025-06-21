package com.bizpoints.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class JwtUtil {

  @Value("${jwt.secret}") private String secret;

  private static final long EXPIRATION_MS = 60 * 60 * 1000;

  public String generateToken(String userId, String username) {
    return Jwts.builder()
        .setSubject(userId)
        .claim("username", username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
        .signWith(SignatureAlgorithm.HS256, secret)
        .compact();
  }

  public String generateToken(String userId) {
    return generateToken(userId, null);
  }

  public Claims parseToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
  }
}