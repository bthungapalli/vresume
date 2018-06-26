package com.siri.vresume.domain;

import org.springframework.web.multipart.MultipartFile;

public class DefaultVideo {

	private int id;
	private int userId;
	private String videoTitle;
	private MultipartFile defaultVideo;
	private String defaultVideoPath;
	private String fileName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getVideoTitle() {
		return videoTitle;
	}
	public void setVideoTitle(String videoTitle) {
		this.videoTitle = videoTitle;
	}
	public MultipartFile getDefaultVideo() {
		return defaultVideo;
	}
	public void setDefaultVideo(MultipartFile defaultVideo) {
		this.defaultVideo = defaultVideo;
	}
	public String getDefaultVideoPath() {
		return defaultVideoPath;
	}
	public void setDefaultVideoPath(String defaultVideoPath) {
		this.defaultVideoPath = defaultVideoPath;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	
}
