package com.project44.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = {"http://localhost:5173", "https://www.3xample.ca", "https://3xample.ca", "https://ankygautam.github.io"})
public class AnimalTrendController {

    private final AnimalTrendService service;

    public AnimalTrendController(AnimalTrendService service) {
        this.service = service;
    }

    @GetMapping("/trending")
    public List<TrendDto> trending() {
        return service.getTopTrends().stream()
                .map(t -> new TrendDto(t.getTitle(), t.getPlatform(), t.getScore(), t.getSourceUrl(), t.getDetectedAt()))
                .collect(Collectors.toList());
    }

    public record TrendDto(String title, String platform, Double score, String sourceUrl, java.time.OffsetDateTime detectedAt) { }
}
