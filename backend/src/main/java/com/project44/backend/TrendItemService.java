package com.project44.backend;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TrendItemService {
    private final TrendItemRepository repository;

    public TrendItemService(TrendItemRepository repository) {
        this.repository = repository;
    }

    public List<TrendItem> topTrends(String platform, String category) {
        if (platform != null && !platform.isBlank()) {
            return repository.findTop10ByPlatformOrderByScoreDesc(platform);
        }
        if (category != null && !category.isBlank()) {
            return repository.findTop10ByCategoryOrderByScoreDesc(category);
        }
        return repository.findTop10ByOrderByScoreDesc();
    }

    public List<TrendItem> topByEngagement() {
        return repository.findAll().stream()
                .sorted((a, b) -> Long.compare(
                        (b.getLikes() == null ? 0 : b.getLikes()) + (b.getShares() == null ? 0 : b.getShares()),
                        (a.getLikes() == null ? 0 : a.getLikes()) + (a.getShares() == null ? 0 : a.getShares())
                ))
                .limit(10)
                .toList();
    }

    public List<TrendItem> latest() {
        return repository.findTop10ByOrderByDetectedAtDesc();
    }

    @Transactional
    public TrendItem saveOrUpdate(TrendItem item) {
        long likes = item.getLikes() == null ? 0 : item.getLikes();
        long shares = item.getShares() == null ? 0 : item.getShares();
        long comments = item.getComments() == null ? 0 : item.getComments();
        long mentions = item.getMentions() == null ? 0 : item.getMentions();
        item.setScore((double) (likes + shares + comments + mentions));

        Optional<TrendItem> existing = repository.findExisting(
                item.getPlatform(), item.getSourceUrl(), item.getTitle());
        if (existing.isPresent()) {
            TrendItem t = existing.get();
            t.setTitle(item.getTitle());
            t.setTopic(item.getTopic());
            t.setCategory(item.getCategory());
            t.setPlatform(item.getPlatform());
            t.setSourceUrl(item.getSourceUrl());
            t.setMentions(mentions);
            t.setLikes(likes);
            t.setShares(shares);
            t.setComments(comments);
            t.setScore(item.getScore());
            t.setKeyword(item.getKeyword());
            t.setSentiment(item.getSentiment());
            t.setImageUrl(item.getImageUrl());
            t.setDetectedAt(item.getDetectedAt());
            return repository.save(t);
        }
        return repository.save(item);
    }
}
