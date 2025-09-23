package com.portfolio.backend.service;

import com.portfolio.backend.model.Admin;
import com.portfolio.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Admin saveAdmin(Admin admin) {
        // Hash the password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Optional<Admin> getByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    // Login check with BCrypt
    public boolean validateLogin(String username, String rawPassword) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);

        if (adminOpt.isPresent()) {
            String encodedPassword = adminOpt.get().getPassword();
            return passwordEncoder.matches(rawPassword, encodedPassword);
        }
        return false;
    }
}
