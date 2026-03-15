package com.project44.backend;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "animal_trends")
public class AnimalTrend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String animalName;
    private String platform;
    private String sourceUrl;
    private Long mentions;
    private Long likes;
    private Long shares;
    private Long comments;
    private Double score;
    private String keyword;
    private String sentiment;
    private String imageUrl;
    private OffsetDateTime detectedAt = OffsetDateTime.now();

    public AnimalTrend() {}

    public AnimalTrend(String title, String animalName, String platform, String sourceUrl, Long mentions, Long likes,
                       Long shares, Long comments, Double score, String keyword, String sentiment, String imageUrl,
                       OffsetDateTime detectedAt) {
        this.title = title;
        this.animalName = animalName;
        this.platform = platform;
        this.sourceUrl = sourceUrl;
        this.mentions = mentions;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
        this.score = score;
        this.keyword = keyword;
        this.sentiment = sentiment;
        this.imageUrl = imageUrl;
        this.detectedAt = detectedAt;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAnimalName() { return animalName; }
    public void setAnimalName(String animalName) { this.animalName = animalName; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }
    public Long getMentions() { return mentions; }
    public void setMentions(Long mentions) { this.mentions = mentions; }
    public Long getLikes() { return likes; }
    public void setLikes(Long likes) { this.likes = likes; }
    public Long getShares() { return shares; }
    public void setShares(Long shares) { this.shares = shares; }
    public Long getComments() { return comments; }
    public void setComments(Long comments) { this.comments = comments; }
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }
    public String getSentiment() { return sentiment; }
    public void setSentiment(String sentiment) { this.sentiment = sentiment; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public OffsetDateTime getDetectedAt() { return detectedAt; }
    public void setDetectedAt(OffsetDateTime detectedAt) { this.detectedAt = detectedAt; }
}
