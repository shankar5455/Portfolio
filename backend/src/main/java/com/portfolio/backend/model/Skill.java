package com.portfolio.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Skill extends BaseEntity {
    private String name;
    private String level; // Beginner / Intermediate / Expert
    @Column(length = 2000)
    private String imageUrl; // URL or path to skill icon/image

    // Getters and Setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getLevel() {
        return level;
    }
    public void setLevel(String level) {
        this.level = level;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
