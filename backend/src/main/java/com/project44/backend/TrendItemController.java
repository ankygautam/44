package com.project44.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trends")
@CrossOrigin(origins = {"http://localhost:5173", "https://www.3xample.ca", "https://3xample.ca", "https://ankygautam.github.io"})
public class TrendItemController {

    private final TrendItemService service;

    public TrendItemController(TrendItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<TrendDto> top(@RequestParam(required = false) String platform,
                              @RequestParam(required = false) String category) {
        return service.topTrends(platform, category).stream().map(TrendDto::from).collect(Collectors.toList());
    }

    @GetMapping("/latest")
    public List<TrendDto> latest() {
        return service.latest().stream().map(TrendDto::from).collect(Collectors.toList());
    }

    public record TrendDto(Long id, String title, String topic, String category, String platform, String sourceUrl,
                           Long mentions, Long likes, Long shares, Long comments, Double score, String keyword,
                           String sentiment, String imageUrl, java.time.OffsetDateTime detectedAt) {
        static TrendDto from(TrendItem t) {
            return new TrendDto(t.getId(), t.getTitle(), t.getTopic(), t.getCategory(), t.getPlatform(), t.getSourceUrl(),
                    t.getMentions(), t.getLikes(), t.getShares(), t.getComments(), t.getScore(), t.getKeyword(),
                    t.getSentiment(), t.getImageUrl(), t.getDetectedAt());
        }
    }
}
