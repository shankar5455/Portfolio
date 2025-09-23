package com.portfolio.backend.controller;

import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {
    private final AchievementService service;

    public AchievementController(AchievementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Achievement> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getById(@PathVariable Long id) {
        Achievement achievement = service.getById(id);
        return (achievement != null) ? ResponseEntity.ok(achievement) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Achievement create(@RequestBody Achievement achievement) {
        return service.save(achievement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> update(@PathVariable Long id, @RequestBody Achievement achievement) {
        Achievement updated = service.update(id, achievement);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
