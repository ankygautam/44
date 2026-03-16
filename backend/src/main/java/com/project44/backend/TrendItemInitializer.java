package com.project44.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Component
public class TrendItemInitializer {
    private final TrendItemService service;

    public TrendItemInitializer(TrendItemService service) {
        this.service = service;
    }

    @PostConstruct
    public void seed() {
        if (service.topTrends(null, null).isEmpty()) {
            TrendItem one = new TrendItem();
            one.setTitle("Mochi the Red Panda goes viral");
            one.setTopic("red panda");
            one.setCategory("animals");
            one.setPlatform("reddit");
            one.setSourceUrl("https://reddit.com/r/aww");
            one.setMentions(8200L);
            one.setLikes(8200L);
            one.setShares(400L);
            one.setComments(1200L);
            one.setDetectedAt(OffsetDateTime.now());
            service.saveOrUpdate(one);

            TrendItem two = new TrendItem();
            two.setTitle("Luna the Husky howl duet");
            two.setTopic("husky");
            two.setCategory("animals");
            two.setPlatform("tiktok");
            two.setSourceUrl("https://tiktok.com");
            two.setMentions(9800L);
            two.setLikes(9800L);
            two.setShares(2100L);
            two.setComments(900L);
            two.setDetectedAt(OffsetDateTime.now());
            service.saveOrUpdate(two);
        }
    }
}
