package com.project44.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnimalTrendRepository extends JpaRepository<AnimalTrend, Long> {
    List<AnimalTrend> findTop10ByOrderByScoreDesc();
}
