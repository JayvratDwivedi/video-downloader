package com.publicproject.vd.controller;

import com.publicproject.vd.model.DownloadRequest;
import com.publicproject.vd.model.DownloadResponse;
import com.publicproject.vd.service.VideoDownloadService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class VideoDownloaderController {
    private final VideoDownloadService videoDownloadService;

    public VideoDownloaderController(VideoDownloadService videoDownloadService) {
        this.videoDownloadService = videoDownloadService;
    }

    @PostMapping("/resolve")
    public DownloadResponse resolveVideoLink(@RequestBody DownloadRequest request) {
        String downloadLink = videoDownloadService.getDownloadLink(request.getUrl());
        return new DownloadResponse(downloadLink);
    }
}
