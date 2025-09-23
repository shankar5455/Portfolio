package com.portfolio.backend.service;

import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {
    private final AchievementRepository repository;

    public AchievementService(AchievementRepository repository) {
        this.repository = repository;
    }

    public List<Achievement> getAll() {
        return repository.findAll();
    }

    public Achievement getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Achievement save(Achievement achievement) {
        return repository.save(achievement);
    }

    public Achievement update(Long id, Achievement achievement) {
        Achievement existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setTitle(achievement.getTitle());
            existing.setIssuedBy(achievement.getIssuedBy());
            existing.setIssueDate(achievement.getIssueDate());
            existing.setCertificateUrl(achievement.getCertificateUrl());
            existing.setCertificatePhotoUrl(achievement.getCertificatePhotoUrl());
            return repository.save(existing);
        }
        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
