package com.project44.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://www.3xample.ca",
        "https://3xample.ca",
        "https://ankygautam.github.io"
})
public class AnimalController {
    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping("/trending")
    public List<Animal> getTrending() {
        return animalService.getTrendingAnimals();
    }
}
