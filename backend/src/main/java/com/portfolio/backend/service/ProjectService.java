package com.portfolio.backend.service;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Create or Update
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // Get All
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // Delete
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
