package com.project44.backend;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class GoogleTrendService {
    private static final Set<String> ANIMAL_KEYWORDS = new HashSet<>(Arrays.asList(
            "monkey", "penguin", "squirrel", "panda", "capybara", "otter", "dog", "cat", "tiger", "elephant"
    ));

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final TrendItemService trendService;

    public GoogleTrendService(TrendItemService trendService) {
        this.trendService = trendService;
    }

    /**
     * Fetch trending searches from Google Trends (US daily trends) and persist animal-related results.
     */
    public void fetchAndSave() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-480&geo=US"))
                    .header("User-Agent", "ViralAnimalTracker/1.0")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) return;

            // Google Trends API returns )]}\n prefix; strip if present
            String body = response.body();
            if (body.startsWith(")]}")) {
                body = body.substring(body.indexOf('\n') + 1);
            }

            JsonNode root = mapper.readTree(body);
            JsonNode trends = root.path("default").path("trendingSearchesDays").get(0).path("trendingSearches");
            if (!trends.isArray()) return;

            for (JsonNode trend : trends) {
                String title = trend.path("title").path("query").asText("");
                if (!containsAnimalKeyword(title)) continue;

                long score = trend.path("formattedTraffic").asLong(0); // sometimes string like "200K+"
                if (score == 0) {
                    String formatted = trend.path("formattedTraffic").asText("0").replace("+", "").replace("K", "000").replace("M", "000000");
                    try {
                        score = Long.parseLong(formatted);
                    } catch (NumberFormatException ignored) {
                        score = 0;
                    }
                }

                TrendItem at = new TrendItem();
                at.setTitle(title);
                at.setTopic(title);
                at.setCategory("news");
                at.setPlatform("google");
                at.setSourceUrl(trend.path("articles").isArray() && trend.path("articles").size() > 0
                        ? trend.path("articles").get(0).path("url").asText("")
                        : null);
                at.setMentions(score);
                at.setLikes(score);
                at.setShares(0L);
                at.setComments(0L);
                at.setKeyword(extractKeyword(title));
                at.setDetectedAt(OffsetDateTime.now());

                trendService.saveOrUpdate(at);
            }
        } catch (Exception ignored) {
            // fail silently to avoid breaking app
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
