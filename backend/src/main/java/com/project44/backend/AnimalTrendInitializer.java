package com.project44.backend;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.time.OffsetDateTime;

@Component
public class AnimalTrendInitializer {
    private final AnimalTrendService service;

    public AnimalTrendInitializer(AnimalTrendService service) {
        this.service = service;
    }

    @PostConstruct
    public void seed() {
        if (service.getTopTrends().isEmpty()) {
            service.save(new AnimalTrend(
                    "Mochi the Red Panda goes viral",
                    "Mochi the Red Panda",
                    "Reddit",
                    "https://reddit.com/r/aww",
                    8200L,
                    8200L,
                    400L,
                    1200L,
                    null,
                    "red panda",
                    "positive",
                    null,
                    OffsetDateTime.now()));
            service.save(new AnimalTrend(
                    "Luna the Husky howl duet",
                    "Luna the Husky",
                    "TikTok",
                    "https://tiktok.com",
                    9800L,
                    9800L,
                    2100L,
                    900L,
                    null,
                    "husky",
                    "positive",
                    null,
                    OffsetDateTime.now()));
            service.save(new AnimalTrend(
                    "Capybara on metro",
                    "Capybara",
                    "YouTube",
                    "https://youtube.com",
                    6100L,
                    6100L,
                    1750L,
                    800L,
                    null,
                    "capybara",
                    "positive",
                    null,
                    OffsetDateTime.now()));
        }
    }
}
