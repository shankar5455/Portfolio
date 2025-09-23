package com.portfolio.backend.service;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Create or Update Blog
    public Blog saveBlog(Blog blog) {
        if (blog.getId() == null) { // New blog
            blog.setPublishedDate(LocalDateTime.now());
        }
        blog.setLastUpdated(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get by ID
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    // Get by slug
    public Optional<Blog> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug);
    }

    // Delete
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}
