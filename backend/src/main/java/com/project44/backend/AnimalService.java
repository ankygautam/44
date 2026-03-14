package com.project44.backend;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalService {
    private final AnimalRepository repository;

    public AnimalService(AnimalRepository repository) {
        this.repository = repository;
    }

    public List<Animal> getTrendingAnimals() {
        return repository.findTopTrending().stream().limit(10).toList();
    }
}
