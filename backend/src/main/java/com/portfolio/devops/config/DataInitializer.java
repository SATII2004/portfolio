package com.portfolio.devops.config;

import com.portfolio.devops.dto.RegisterRequest;
import com.portfolio.devops.entity.Role;
import com.portfolio.devops.repository.UserRepository;
import com.portfolio.devops.service.UserService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserService userService;
    private final UserRepository userRepository;

    public DataInitializer(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void seedUsers() {
        if (userRepository.count() > 0) {
            return;
        }
        RegisterRequest admin = new RegisterRequest();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword("admin123");
        admin.setRole(Role.ROLE_ADMIN);

        RegisterRequest user = new RegisterRequest();
        user.setUsername("user");
        user.setEmail("user@example.com");
        user.setPassword("user123");
        user.setRole(Role.ROLE_USER);

        userService.register(admin);
        userService.register(user);
        log.info("Seeded default admin and user accounts");
    }
}

