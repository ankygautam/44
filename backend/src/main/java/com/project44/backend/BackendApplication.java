package com.project44.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner seed(AnimalRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Animal("Mochi the Red Panda", "Instagram", 4200L, 890L));
                repo.save(new Animal("Luna the Husky", "TikTok", 9800L, 2100L));
                repo.save(new Animal("Kiki the Capybara", "YouTube", 6100L, 1750L));
            }
        };
    }
}
