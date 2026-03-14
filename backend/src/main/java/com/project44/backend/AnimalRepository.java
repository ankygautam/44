package com.project44.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    @Query("SELECT a FROM Animal a ORDER BY (a.likes + a.shares) DESC")
    List<Animal> findTopTrending();
}
