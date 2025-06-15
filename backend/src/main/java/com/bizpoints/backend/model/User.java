package com.bizpoints.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
  @Id private String id;
  private String email;
  private String password;

  // 1) No-args constructor for Jackson
  public User() {}

  // 2) All-args constructor (optional)
  public User(String id, String email, String password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  // 3) Getters & setters
  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
}
