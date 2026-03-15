package com.project44.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.time.OffsetDateTime;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner seed(AnimalTrendRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new AnimalTrend(
                        "Mochi the Red Panda goes viral",
                        "Mochi the Red Panda",
                        "Reddit",
                        "https://reddit.com/r/aww",
                        8200L,
                        8200L,
                        400L,
                        1200L,
                        8600.0,
                        "red panda",
                        "positive",
                        null,
                        OffsetDateTime.now()));
                repo.save(new AnimalTrend(
                        "Luna the Husky howl duet",
                        "Luna the Husky",
                        "TikTok",
                        "https://tiktok.com",
                        9800L,
                        9800L,
                        2100L,
                        900L,
                        11900.0,
                        "husky",
                        "positive",
                        null,
                        OffsetDateTime.now()));
                repo.save(new AnimalTrend(
                        "Capybara on metro",
                        "Capybara",
                        "YouTube",
                        "https://youtube.com",
                        6100L,
                        6100L,
                        1750L,
                        800L,
                        7850.0,
                        "capybara",
                        "positive",
                        null,
                        OffsetDateTime.now()));
            }
        };
    }
}
