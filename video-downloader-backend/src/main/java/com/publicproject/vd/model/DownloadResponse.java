package com.publicproject.vd.model;

public class DownloadResponse {
    private String downloadUrl;

    public DownloadResponse(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
