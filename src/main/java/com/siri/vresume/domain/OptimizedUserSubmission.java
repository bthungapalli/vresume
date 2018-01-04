package com.siri.vresume.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class OptimizedUserSubmission {
	private int id;
	private String email;
	private String password;
	private int role;
	private String firstName;
	private String middleName;
	private String lastName;
	private String phone;
	private String location;
	private String currentJobTitle;
	private String currentEmployer;
	private String experience;
	private int currentSalary;
	private int expectedSalary;
	private String primarySkills;
	private String secondarySkills;
	private String prefredLocations;
	private int jobType;
	private String workAuthorization;
	private String imagePath;
	private byte[] profieImageBytes;
    private MultipartFile profileImage;
	private int mailAccount;
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
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the role
	 */
	public int getRole() {
		return role;
	}
	/**
	 * @param role the role to set
	 */
	public void setRole(int role) {
		this.role = role;
	}
	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}
	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	/**
	 * @return the middleName
	 */
	public String getMiddleName() {
		return middleName;
	}
	/**
	 * @param middleName the middleName to set
	 */
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}
	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	/**
	 * @return the currentJobTitle
	 */
	public String getCurrentJobTitle() {
		return currentJobTitle;
	}
	/**
	 * @param currentJobTitle the currentJobTitle to set
	 */
	public void setCurrentJobTitle(String currentJobTitle) {
		this.currentJobTitle = currentJobTitle;
	}
	/**
	 * @return the currentEmployer
	 */
	public String getCurrentEmployer() {
		return currentEmployer;
	}
	/**
	 * @param currentEmployer the currentEmployer to set
	 */
	public void setCurrentEmployer(String currentEmployer) {
		this.currentEmployer = currentEmployer;
	}
	/**
	 * @return the experience
	 */
	public String getExperience() {
		return experience;
	}
	/**
	 * @param experience the experience to set
	 */
	public void setExperience(String experience) {
		this.experience = experience;
	}
	/**
	 * @return the currentSalary
	 */
	public int getCurrentSalary() {
		return currentSalary;
	}
	/**
	 * @param currentSalary the currentSalary to set
	 */
	public void setCurrentSalary(int currentSalary) {
		this.currentSalary = currentSalary;
	}
	/**
	 * @return the expectedSalary
	 */
	public int getExpectedSalary() {
		return expectedSalary;
	}
	/**
	 * @param expectedSalary the expectedSalary to set
	 */
	public void setExpectedSalary(int expectedSalary) {
		this.expectedSalary = expectedSalary;
	}
	/**
	 * @return the primarySkills
	 */
	public String getPrimarySkills() {
		return primarySkills;
	}
	/**
	 * @param primarySkills the primarySkills to set
	 */
	public void setPrimarySkills(String primarySkills) {
		this.primarySkills = primarySkills;
	}
	/**
	 * @return the secondarySkills
	 */
	public String getSecondarySkills() {
		return secondarySkills;
	}
	/**
	 * @param secondarySkills the secondarySkills to set
	 */
	public void setSecondarySkills(String secondarySkills) {
		this.secondarySkills = secondarySkills;
	}
	/**
	 * @return the prefredLocations
	 */
	public String getPrefredLocations() {
		return prefredLocations;
	}
	/**
	 * @param prefredLocations the prefredLocations to set
	 */
	public void setPrefredLocations(String prefredLocations) {
		this.prefredLocations = prefredLocations;
	}
	/**
	 * @return the jobType
	 */
	public int getJobType() {
		return jobType;
	}
	/**
	 * @param jobType the jobType to set
	 */
	public void setJobType(int jobType) {
		this.jobType = jobType;
	}
	/**
	 * @return the workAuthorization
	 */
	public String getWorkAuthorization() {
		return workAuthorization;
	}
	/**
	 * @param workAuthorization the workAuthorization to set
	 */
	public void setWorkAuthorization(String workAuthorization) {
		this.workAuthorization = workAuthorization;
	}
	/**
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}
	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	/**
	 * @return the profieImageBytes
	 */
	public byte[] getProfieImageBytes() {
		return profieImageBytes;
	}
	/**
	 * @param profieImageBytes the profieImageBytes to set
	 */
	public void setProfieImageBytes(byte[] profieImageBytes) {
		this.profieImageBytes = profieImageBytes;
	}
	/**
	 * @return the profileImage
	 */
	public MultipartFile getProfileImage() {
		return profileImage;
	}
	/**
	 * @param profileImage the profileImage to set
	 */
	public void setProfileImage(MultipartFile profileImage) {
		this.profileImage = profileImage;
	}
	/**
	 * @return the mailAccount
	 */
	public int getMailAccount() {
		return mailAccount;
	}
	/**
	 * @param mailAccount the mailAccount to set
	 */
	public void setMailAccount(int mailAccount) {
		this.mailAccount = mailAccount;
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
		this.submittedToHM = submittedToHM;
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
	 * @return the dateChanged
	 */
	public boolean isDateChanged() {
		return dateChanged;
	}
	/**
	 * @param dateChanged the dateChanged to set
	 */
	public void setDateChanged(boolean dateChanged) {
		this.dateChanged = dateChanged;
	}
    
}
