package com.portfolio.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends BaseEntity {
    private String username;
    private String password;
    // Getters and Setters
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
