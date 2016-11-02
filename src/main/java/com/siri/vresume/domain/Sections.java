package com.siri.vresume.domain;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

public class Sections implements Serializable{
	
	public static final long serialVersionUID = 42L;
	
	@Id
	private int sectionId;
	private String sectionName;
	private String submissionId;
	private int userRating;
	private int hmRating;
	private int cmRating;
	private String videoPath;
	private MultipartFile videoFile;
	private byte[] videoBytes;
	
	/**
	 * @return the videoFile
	 */
	public MultipartFile getVideoFile() {
		return videoFile;
	}
	/**
	 * @param videoFile the videoFile to set
	 */
	public void setVideoFile(MultipartFile videoFile) {
		this.videoFile = videoFile;
	}
	/**
	 * @return the sectionId
	 */
	public int getSectionId() {
		return sectionId;
	}
	/**
	 * @param sectionId the sectionId to set
	 */
	public void setSectionId(int sectionId) {
		this.sectionId = sectionId;
	}
	/**
	 * @return the sectionName
	 */
	public String getSectionName() {
		return sectionName;
	}
	/**
	 * @param sectionName the sectionName to set
	 */
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	/**
	 * @return the userRating
	 */
	public int getUserRating() {
		return userRating;
	}
	/**
	 * @param userRating the userRating to set
	 */
	public void setUserRating(int userRating) {
		this.userRating = userRating;
	}
	/**
	 * @return the hmRating
	 */
	public int getHmRating() {
		return hmRating;
	}
	/**
	 * @param hmRating the hmRating to set
	 */
	public void setHmRating(int hmRating) {
		this.hmRating = hmRating;
	}
	/**
	 * @return the cmRating
	 */
	public int getCmRating() {
		return cmRating;
	}
	/**
	 * @param cmRating the cmRating to set
	 */
	public void setCmRating(int cmRating) {
		this.cmRating = cmRating;
	}
	/**
	 * @return the videoPath
	 */
	public String getVideoPath() {
		return videoPath;
	}
	/**
	 * @param videoPath the videoPath to set
	 */
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
	}
	/**
	 * @return the videoBytes
	 */
	public byte[] getVideoBytes() {
		return videoBytes;
	}
	/**
	 * @param videoBytes the videoBytes to set
	 */
	public void setVideoBytes(byte[] videoBytes) {
		this.videoBytes = videoBytes;
	}
	/**
	 * @return the submissionId
	 */
	public String getSubmissionId() {
		return submissionId;
	}
	/**
	 * @param submissionId the submissionId to set
	 */
	public void setSubmissionId(String submissionId) {
		this.submissionId = submissionId;
	}
	
	
	
}
