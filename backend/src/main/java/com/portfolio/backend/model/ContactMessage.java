package com.portfolio.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class ContactMessage extends BaseEntity {
    private String name;
    private String email;

    @Column(length = 2000)
    private String message;
    // Getters and Setters

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
