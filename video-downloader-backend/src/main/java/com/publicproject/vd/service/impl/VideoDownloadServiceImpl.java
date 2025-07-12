package com.publicproject.vd.service.impl;

import com.publicproject.vd.service.VideoDownloadService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VideoDownloadServiceImpl implements VideoDownloadService {

    @Override
    public String getDownloadLink(String url) {
        try {
            if (url.contains("/e/"))
                url = url.replace("/e/", "/v/");
            Document doc = Jsoup.connect(url).get();
            String htmlSource = doc.html();

            Pattern norobotLinkPattern = Pattern.compile("document\\.getElementById\\('norobotlink'\\)\\.innerHTML = (.+);");
            Matcher norobotLinkMatcher = norobotLinkPattern.matcher(htmlSource);
            if (norobotLinkMatcher.find()) {
                String norobotLinkContent = norobotLinkMatcher.group(1);
                Pattern tokenPattern = Pattern.compile("token=([^&']+)");
                Matcher tokenMatcher = tokenPattern.matcher(norobotLinkContent);
                if (tokenMatcher.find()) {
                    String token = tokenMatcher.group(1);
                    Elements divElements = doc.select("div#ideoooolink[style=display:none;]");
                    if (!divElements.isEmpty()) {
                        String streamtape = Objects.requireNonNull(divElements.first()).text();
                        String fullUrl = "https:/" + streamtape + "&token=" + token;
                        return fullUrl + "&dl=1s";
                    }
                }
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }
}
