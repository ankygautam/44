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
public class NewsTrendService {
    private static final Set<String> ANIMAL_KEYWORDS = new HashSet<>(Arrays.asList(
            "monkey", "penguin", "squirrel", "panda", "capybara", "otter", "dog", "cat", "tiger", "elephant"
    ));

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final TrendItemService trendService;

    public NewsTrendService(TrendItemService trendService) {
        this.trendService = trendService;
    }

    public void fetchAndSave() {
        String apiKey = System.getenv("NEWSAPI_KEY");
        if (apiKey == null || apiKey.isBlank()) return;

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=" + apiKey))
                    .header("User-Agent", "ViralAnimalTracker/1.0")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) return;

            JsonNode root = mapper.readTree(response.body());
            JsonNode articles = root.path("articles");
            if (!articles.isArray()) return;

            for (JsonNode article : articles) {
                String title = article.path("title").asText("");
                if (!containsAnimalKeyword(title)) continue;

                TrendItem trend = new TrendItem();
                trend.setTitle(title);
                trend.setTopic(title);
                trend.setCategory("news");
                trend.setPlatform("news");
                trend.setSourceUrl(article.path("url").asText(""));
                trend.setMentions(0L);
                trend.setLikes(1L); // minimal signal so score is non-zero
                trend.setShares(0L);
                trend.setComments(0L);
                trend.setKeyword(extractKeyword(title));
                trend.setSentiment(null);
                trend.setImageUrl(article.path("urlToImage").asText(null));
                trend.setDetectedAt(OffsetDateTime.now());

                trendService.saveOrUpdate(trend);
            }
        } catch (Exception ignored) {
            // ignore to keep app running if NewsAPI fails
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
