/**
 * 
 */
package com.siri.vresume.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author bthungapalli
 *
 */

public class Submission extends DateTimeVars {
	
	@Id
	private int id;

	private int userId;
	private int jobId;
	private List<Sections> sections = new ArrayList<>();
	private String status;
	private int activityUserId;
	private Date hiringDate;
	private List<Availability> availablities = new ArrayList<>();
	
	private String resumeName;
	private MultipartFile resume;
	private String resumePath;
	private byte[] resumeBytes;
	
	/**
	 * @return the availablities
	 */
	public List<Availability> getAvailablities() {
		return availablities;
	}
	/**
	 * @param availablities the availablities to set
	 */
	public void setAvailablities(List<Availability> availablities) {
		this.availablities = availablities;
	}
	/**
	 * @return the resumeName
	 */
	public String getResumeName() {
		return resumeName;
	}
	/**
	 * @param resumeName the resumeName to set
	 */
	public void setResumeName(String resumeName) {
		this.resumeName = resumeName;
	}
	/**
	 * @return the resume
	 */
	public MultipartFile getResume() {
		return resume;
	}
	/**
	 * @param resume the resume to set
	 */
	public void setResume(MultipartFile resume) {
		this.resume = resume;
	}
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
	/**
	 * @return the jobId
	 */
	public int getJobId() {
		return jobId;
	}
	/**
	 * @param jobId the jobId to set
	 */
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * @return the activityUserId
	 */
	public int getActivityUserId() {
		return activityUserId;
	}
	/**
	 * @param activityUserId the activityUserId to set
	 */
	public void setActivityUserId(int activityUserId) {
		this.activityUserId = activityUserId;
	}
	/**
	 * @return the hiringDate
	 */
	public Date getHiringDate() {
		return hiringDate;
	}
	/**
	 * @param hiringDate the hiringDate to set
	 */
	public void setHiringDate(Date hiringDate) {
		this.hiringDate = hiringDate;
	}
	/**
	 * @return the resumePath
	 */
	public String getResumePath() {
		return resumePath;
	}
	/**
	 * @param resumePath the resumePath to set
	 */
	public void setResumePath(String resumePath) {
		this.resumePath = resumePath;
	}
	/**
	 * @return the resumeBytes
	 */
	public byte[] getResumeBytes() {
		return resumeBytes;
	}
	/**
	 * @param resumeBytes the resumeBytes to set
	 */
	public void setResumeBytes(byte[] resumeBytes) {
		this.resumeBytes = resumeBytes;
	}
	/**
	 * @return the sections
	 */
	public List<Sections> getSections() {
		return sections;
	}
	/**
	 * @param sections the sections to set
	 */
	public void setSections(List<Sections> sections) {
		this.sections = sections;
	}
}
