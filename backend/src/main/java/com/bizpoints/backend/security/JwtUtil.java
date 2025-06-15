package com.bizpoints.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


/**
 * Utility for generating and validating JSON Web Tokens (JWT).
 */
@Component
public class JwtUtil {

  /**
   * JWT signing secret, injected from application.properties (jwt.secret).
   */
  @Value("${jwt.secret}") private String secret;

  /**
   * Token validity period: 1 hour in milliseconds.
   */
  private static final long EXPIRATION_MS = 60 * 60 * 1000;

  /**
   * Generate a JWT containing the given userId as the subject.
   *
   * @param userId the ID of the user to include in the token
   * @return a signed JWT string
   */
  public String generateToken(String userId) {
    return Jwts.builder()
        .setSubject(userId)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
        .signWith(SignatureAlgorithm.HS256, secret)
        .compact();
  }

  /**
   * Parse and validate the given JWT, returning its claims.
   *
   * @param token the JWT string to parse
   * @return the parsed Claims object (contains subject, issuedAt, expiration,
   *     etc.)
   * @throws io.jsonwebtoken.JwtException if token is invalid or expired
   */
  public Claims parseToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
  }
}