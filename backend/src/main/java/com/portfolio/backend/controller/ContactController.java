package com.portfolio.backend.controller;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendMessage(@RequestBody ContactMessage message) {
        emailService.sendContactMessage(message);
        return "✅ Message sent successfully!";
    }
}
