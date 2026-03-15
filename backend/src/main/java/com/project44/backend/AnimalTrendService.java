package com.project44.backend;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalTrendService {
    private final AnimalTrendRepository repository;

    public AnimalTrendService(AnimalTrendRepository repository) {
        this.repository = repository;
    }

    public List<AnimalTrend> getTopTrends() {
        return repository.findTop10ByOrderByScoreDesc();
    }

    public AnimalTrend save(AnimalTrend trend) {
        long likes = trend.getLikes() == null ? 0 : trend.getLikes();
        long shares = trend.getShares() == null ? 0 : trend.getShares();
        long comments = trend.getComments() == null ? 0 : trend.getComments();
        trend.setScore((double) (likes + shares + comments));
        return repository.save(trend);
    }
}
