package com.publicproject.vd.model;

public class DownloadRequest {
    private String url;

    public DownloadRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
