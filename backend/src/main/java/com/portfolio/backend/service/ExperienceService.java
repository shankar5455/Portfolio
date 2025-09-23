package com.portfolio.backend.service;

import com.portfolio.backend.model.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    // Create or Update
    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    // Get All
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    // Get by ID
    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    // Delete
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}
