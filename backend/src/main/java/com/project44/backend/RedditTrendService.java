package com.project44.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class RedditTrendService {
    private static final Set<String> ANIMAL_KEYWORDS = new HashSet<>(Arrays.asList(
            "monkey", "penguin", "squirrel", "panda", "capybara", "otter", "dog", "cat", "tiger", "elephant"
    ));

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final TrendItemService trendService;

    public RedditTrendService(TrendItemService trendService) {
        this.trendService = trendService;
    }

    /**
     * Fetch viral animal posts from Reddit /r/aww top posts and persist qualifying AnimalTrend entries.
     */
    public void fetchAndSave() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.reddit.com/r/aww/top.json?limit=20"))
                    .header("User-Agent", "ViralAnimalTracker/1.0")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                return;
            }
            JsonNode root = mapper.readTree(response.body());
            JsonNode children = root.path("data").path("children");
            if (!children.isArray()) return;

            for (JsonNode child : children) {
                JsonNode data = child.path("data");
                String title = data.path("title").asText("");
                if (!containsAnimalKeyword(title)) continue;

                String url = data.path("url").asText("");
                long upvotes = data.path("ups").asLong(0);
                long comments = data.path("num_comments").asLong(0);
                double score = upvotes + comments;

                TrendItem trend = new TrendItem();
                trend.setTitle(title);
                trend.setTopic(title);
                trend.setCategory("animals");
                trend.setPlatform("reddit");
                trend.setSourceUrl(url);
                trend.setLikes(upvotes);
                trend.setMentions(upvotes);
                trend.setShares(0L);
                trend.setComments(comments);
                trend.setKeyword(extractKeyword(title));
                trend.setSentiment(null);
                trend.setImageUrl(data.path("thumbnail").asText(null));
                trend.setDetectedAt(OffsetDateTime.now());

                trendService.saveOrUpdate(trend);
            }
        } catch (Exception ignored) {
            // Swallow errors to avoid breaking app if Reddit is unreachable
        }
    }

    private boolean containsAnimalKeyword(String text) {
        String lower = text.toLowerCase();
        return ANIMAL_KEYWORDS.stream().anyMatch(lower::contains);
    }

    private String extractKeyword(String text) {
        String lower = text.toLowerCase();
        return ANIMAL_KEYWORDS.stream().filter(lower::contains).findFirst().orElse(null);
    }
}
