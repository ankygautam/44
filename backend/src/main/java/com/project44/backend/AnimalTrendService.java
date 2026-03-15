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
}
