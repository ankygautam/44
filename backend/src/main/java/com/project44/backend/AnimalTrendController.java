package com.project44.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = {"http://localhost:5173", "https://www.3xample.ca", "https://3xample.ca", "https://ankygautam.github.io"})
public class AnimalTrendController {

    private final AnimalTrendService service;

    public AnimalTrendController(AnimalTrendService service) {
        this.service = service;
    }

    @GetMapping("/trending")
    public List<AnimalTrend> trending() {
        return service.getTopTrends();
    }
}
