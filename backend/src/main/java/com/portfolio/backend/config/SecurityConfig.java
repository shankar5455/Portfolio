package com.portfolio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                // ---------- PUBLIC ENDPOINTS ----------
                .requestMatchers("/api/admin/login", "/api/admin/create").permitAll()
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/skills/**",
                        "/api/projects/**",
                        "/api/experiences/**",
                        "/api/blogs/**",
                        "/api/achievements/**"
                ).permitAll()
                .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()

                // ---------- EVERYTHING ELSE ----------
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());   // keep simple Basic auth for now

        return http.build();
    }

    // Global CORS config
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Origins allowed to call backend (add your domain here later if you host it)
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:3000",   // React dev CRA
                "http://localhost:5173",   // React dev Vite
                "http://localhost:30080",  // Frontend via Kubernetes NodePort
                "http://127.0.0.1:30080"
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
