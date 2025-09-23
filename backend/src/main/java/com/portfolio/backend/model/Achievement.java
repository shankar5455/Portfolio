package com.portfolio.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Achievement extends BaseEntity {
    private String title;
    private String issuedBy;
    private String issueDate;
    private String certificateUrl;      // link to certificate
    private String certificatePhotoUrl; // photo/image URL of certificate

    // Getters and Setters
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getIssuedBy() {
        return issuedBy;
    }
    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public String getIssueDate() {
        return issueDate;
    }
    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getCertificateUrl() {
        return certificateUrl;
    }
    public void setCertificateUrl(String certificateUrl) {
        this.certificateUrl = certificateUrl;
    }

    public String getCertificatePhotoUrl() {
        return certificatePhotoUrl;
    }
    public void setCertificatePhotoUrl(String certificatePhotoUrl) {
        this.certificatePhotoUrl = certificatePhotoUrl;
    }
}
