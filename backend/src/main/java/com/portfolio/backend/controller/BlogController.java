package com.portfolio.backend.controller;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Create Blog (Admin only)
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.saveBlog(blog);
    }

    // Get all Blogs (Public)
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // Get Blog by ID (Public)
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id).orElse(null);
    }

    // Get Blog by Slug (Public)
    @GetMapping("/slug/{slug}")
    public Blog getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug).orElse(null);
    }

    // Update Blog (Admin only)
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        blog.setId(id);
        return blogService.saveBlog(blog);
    }

    // Delete Blog (Admin only)
    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return "Blog deleted successfully ✅";
    }
}
