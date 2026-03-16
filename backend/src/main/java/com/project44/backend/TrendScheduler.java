package com.project44.backend;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TrendScheduler {
    private final RedditTrendService redditTrendService;
    private final GoogleTrendService googleTrendService;
    private final NewsTrendService newsTrendService;

    public TrendScheduler(RedditTrendService redditTrendService, GoogleTrendService googleTrendService, NewsTrendService newsTrendService) {
        this.redditTrendService = redditTrendService;
        this.googleTrendService = googleTrendService;
        this.newsTrendService = newsTrendService;
    }

    @Scheduled(fixedRate = 900_000)
    public void pullTrends() {
        redditTrendService.fetchAndSave();
        googleTrendService.fetchAndSave();
        newsTrendService.fetchAndSave();
    }
}
