package com.portfolio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for Postman/React testing
            .cors(withDefaults()) // ✅ Enable CORS support
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/admin/login", "/api/admin/create").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/skills/**", "/api/projects/**",
                                 "/api/experiences/**", "/api/blogs/**", "/api/achievements/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/skills/**", "/api/projects/**",
                        "/api/experiences/**", "/api/blogs/**", "/api/achievements/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/skills/**", "/api/projects/**",
                        "/api/experiences/**", "/api/blogs/**", "/api/achievements/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/skills/**", "/api/projects/**",
                        "/api/experiences/**", "/api/blogs/**", "/api/achievements/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()

                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults()); // Basic Auth

        return http.build();
    }

    // ✅ Global CORS config
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000", // React (CRA)
                "http://localhost:5173"  // React (Vite) if you use it
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
