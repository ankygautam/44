package com.project44.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface TrendItemRepository extends JpaRepository<TrendItem, Long> {
    List<TrendItem> findTop10ByOrderByScoreDesc();
    List<TrendItem> findTop10ByPlatformOrderByScoreDesc(String platform);
    List<TrendItem> findTop10ByCategoryOrderByScoreDesc(String category);
    List<TrendItem> findTop10ByOrderByDetectedAtDesc();

    @Query("select t from TrendItem t where t.platform = ?1 and (t.sourceUrl = ?2 or t.title = ?3)")
    Optional<TrendItem> findExisting(String platform, String sourceUrl, String title);
}
