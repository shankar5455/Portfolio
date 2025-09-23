package com.portfolio.backend.repository;

import com.portfolio.backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findBySlug(String slug); // SEO-friendly fetch
}
