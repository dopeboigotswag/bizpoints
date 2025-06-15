package com.bizpoints.backend.dto;

/**
 * Simple DTO for login credentials binding.
 */
public class Credentials {

  private String email;
  private String password;

  // Jackson requires a no-args constructor
  public Credentials() {}

  // Getters & setters for JSON binding
  public String getEmail() { return email; }

  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }

  public void setPassword(String password) { this.password = password; }
}
