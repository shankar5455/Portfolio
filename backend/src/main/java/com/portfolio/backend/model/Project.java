package com.portfolio.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Project extends BaseEntity {
    private String title;
    private String description;
    private String techStack;
    private String githubLink;
    private String demoLink;
    private String imageUrl;
    // Getters and Setters
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTechStack() {
		return techStack;
	}
	public void setTechStack(String techStack) {
		this.techStack = techStack;
	}
	public String getGithubLink() {
		return githubLink;
	}
	public void setGithubLink(String githubLink) {
		this.githubLink = githubLink;
	}
	public String getDemoLink() {
		return demoLink;
	}
	public void setDemoLink(String demoLink) {
		this.demoLink = demoLink;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
