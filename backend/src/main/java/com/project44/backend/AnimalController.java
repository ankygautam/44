package com.project44.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = {"http://localhost:5173", "https://www.3xample.ca", "https://3xample.ca", "https://ankygautam.github.io"})
public class AnimalController {

    private final TrendItemService service;

    public AnimalController(TrendItemService service) {
        this.service = service;
    }

    @GetMapping("/trending")
    public List<AnimalDto> trending() {
        return service.topByEngagement().stream()
                .map(AnimalDto::from)
                .collect(Collectors.toList());
    }

    public record AnimalDto(Long id, String name, String platform, Long likes, Long shares, java.time.OffsetDateTime createdAt) {
        static AnimalDto from(TrendItem t) {
            return new AnimalDto(
                    t.getId(),
                    t.getTitle(),
                    t.getPlatform(),
                    t.getLikes(),
                    t.getShares(),
                    t.getDetectedAt());
        }
    }
}
