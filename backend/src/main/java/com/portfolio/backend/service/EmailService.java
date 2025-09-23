package com.portfolio.backend.service;

import com.portfolio.backend.model.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactMessage(ContactMessage contactMessage) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo("2300033631cseelge@gmail.com");
            helper.setSubject("📩 New Contact Message from " + contactMessage.getName());

            // HTML Template
            String htmlContent = """
                <div style="
				    font-family: 'Open Sans', Arial, sans-serif; 
				    line-height: 1.6; 
				    color: #333; 
				    padding: 20px; 
				    background: #f9f9f9; 
				    border-radius: 12px; 
				    border: 1px solid #ddd;
				">
				    <h2 style="
				        color: #695aa6; 
				        margin-bottom: 20px;
				        font-family: 'Baloo Paaji', cursive;
				    ">
				        New Contact Message
				    </h2>
				
				    <p style="margin-bottom:10px;"><strong>Name:</strong> %s</p>
				    <p style="margin-bottom:10px;"><strong>Email:</strong> %s</p>
				    
				    <p style="margin-bottom:5px;"><strong>Message:</strong></p>
				    <div style="
				        background: #fff;
				        padding: 15px;
				        border-radius: 8px;
				        border: 1px solid #ccc;
				        color: #555;
				        font-size: 0.95rem;
				        white-space: pre-wrap;
				    ">
				        %s
				    </div>
				
				    <p style="
				        margin-top:20px; 
				        font-size:12px; 
				        color:#888;
				    ">
				        This message was sent from your portfolio contact form.
				    </p>
				</div>
            """.formatted(contactMessage.getName(),
                          contactMessage.getEmail(),
                          contactMessage.getMessage());

            helper.setText(htmlContent, true); // true enables HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
