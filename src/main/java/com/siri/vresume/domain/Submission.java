/**
 * 
 */
package com.siri.vresume.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author bthungapalli
 *
 */

public class Submission extends DateTimeVars implements Serializable {
	
	private static final long serialVersionUID = 7532075887361974315L;

	
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
	
	@JsonIgnoreProperties
	private MultipartFile resume;
	
	private String resumePath;
	private byte[] resumeBytes;
	
	private List<Comment> comments;
	
	private String title;
	private String jobDescription;
	
	private String interviewMode;
	private String interviewDescription;
	private Set<Integer> availabilityId;
	private Set<String> interviewScheduled = new HashSet<String>();
	private Boolean submittedToHM;
	private double averageCMRating=0.0;
	private String notes;
	private boolean dateChanged;
	private boolean isCMPosted;
	private int createdBy;
	private int hiringUser;
	
	
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
	/**
	 * @return the comments
	 */
	public List<Comment> getComments() {
		return comments;
	}
	/**
	 * @param comments the comments to set
	 */
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the jobDescription
	 */
	public String getJobDescription() {
		return jobDescription;
	}
	/**
	 * @param jobDescription the jobDescription to set
	 */
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	/**
	 * @return the interviewMode
	 */
	public String getInterviewMode() {
		return interviewMode;
	}
	/**
	 * @param interviewMode the interviewMode to set
	 */
	public void setInterviewMode(String interviewMode) {
		this.interviewMode = interviewMode;
	}
	/**
	 * @return the interviewDescription
	 */
	public String getInterviewDescription() {
		return interviewDescription;
	}
	/**
	 * @param interviewDescription the interviewDescription to set
	 */
	public void setInterviewDescription(String interviewDescription) {
		this.interviewDescription = interviewDescription;
	}
	/**
	 * @return the availabilityId
	 */
	public Set<Integer> getAvailabilityId() {
		return availabilityId;
	}
	/**
	 * @param availabilityId the availabilityId to set
	 */
	public void setAvailabilityId(Set<Integer> availabilityId) {
		this.availabilityId = availabilityId;
	}
	/**
	 * @return the interviewScheduled
	 */
	public Set<String> getInterviewScheduled() {
		return interviewScheduled;
	}
	/**
	 * @param interviewScheduled the interviewScheduled to set
	 */
	public void setInterviewScheduled(Set<String> interviewScheduled) {
		this.interviewScheduled = interviewScheduled;
	}
	/**
	 * @return the submittedToHM
	 */
	public Boolean getSubmittedToHM() {
		return submittedToHM;
	}
	/**
	 * @param submittedToHM the submittedToHM to set
	 */
	public void setSubmittedToHM(Boolean submittedToHM) {
		this.submittedToHM = submittedToHM ==null ? false : submittedToHM;
	}
	/**
	 * @return the averageCMRating
	 */
	public double getAverageCMRating() {
		return averageCMRating;
	}
	/**
	 * @param averageCMRating the averageCMRating to set
	 */
	public void setAverageCMRating(double averageCMRating) {
		this.averageCMRating = averageCMRating;
	}
	/**
	 * @return the notes
	 */
	public String getNotes() {
		return notes;
	}
	/**
	 * @param notes the notes to set
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
	/**
	 * @return the isDateChanged
	 */
	public boolean isDateChanged() {
		return dateChanged;
	}
	/**
	 * @param isDateChanged the isDateChanged to set
	 */
	public void setDateChanged(boolean dateChanged) {
		this.dateChanged = dateChanged;
	}
	public boolean isCMPosted() {
		return hiringUser == createdBy;
	}
	public void setCMPosted(boolean isCMPosted) {
		this.isCMPosted = isCMPosted;
	}
	public int getHiringUser() {
		return hiringUser;
	}
	public void setHiringUser(int hiringUser) {
		this.hiringUser = hiringUser;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
}
