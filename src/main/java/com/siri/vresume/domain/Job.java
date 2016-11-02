/**
 * 
 */
package com.siri.vresume.domain;

import java.io.Serializable;
import java.sql.Date;

import org.springframework.data.annotation.Id;

/**
 * @author bthungapalli
 *
 */
public class Job extends DateTimeVars implements Serializable {

	public static final long serialVersionUID = 42L;
	
	@Id
	private int id;
	
	private int templateId;
	private String title;
	private String description;
	private String location;
	private int hiringUserId;
	private String skills;
	private String status;
	private int jobType;
	private String compensation;
	private String experience;
	private String duration;
	private Date startDate;
	private int createdById;
	private Date endDate;
	private int submissionCount;
	
	private boolean applied;
	private String companyName;
	
	
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
	 * @return the templateId
	 */
	public int getTemplateId() {
		return templateId;
	}
	/**
	 * @param templateId the templateId to set
	 */
	public void setTemplateId(int templateId) {
		this.templateId = templateId;
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
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
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
	 * @return the hiringUserId
	 */
	public int getHiringUserId() {
		return hiringUserId;
	}
	/**
	 * @param hiringUserId the hiringUserId to set
	 */
	public void setHiringUserId(int hiringUserId) {
		this.hiringUserId = hiringUserId;
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
	 * @return the compensation
	 */
	public String getCompensation() {
		return compensation;
	}
	/**
	 * @param compensation the compensation to set
	 */
	public void setCompensation(String compensation) {
		this.compensation = compensation;
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
	 * @return the duration
	 */
	public String getDuration() {
		return duration;
	}
	/**
	 * @param duration the duration to set
	 */
	public void setDuration(String duration) {
		this.duration = duration;
	}
	/**
	 * @return the startDate
	 */
	public Date getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	/**
	 * @return the createdById
	 */
	public int getCreatedById() {
		return createdById;
	}
	/**
	 * @param createdById the createdById to set
	 */
	public void setCreatedById(int createdById) {
		this.createdById = createdById;
	}
	/**
	 * @return the skills
	 */
	public String getSkills() {
		return skills;
	}
	/**
	 * @param skills the skills to set
	 */
	public void setSkills(String skills) {
		this.skills = skills;
	}
	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	/**
	 * @return the submissionCount
	 */
	public int getSubmissionCount() {
		return submissionCount;
	}
	/**
	 * @param submissionCount the submissionCount to set
	 */
	public void setSubmissionCount(int submissionCount) {
		this.submissionCount = submissionCount;
	}
	/**
	 * @return the applied
	 */
	public boolean isApplied() {
		return applied;
	}
	/**
	 * @param applied the applied to set
	 */
	public void setApplied(boolean applied) {
		this.applied = applied;
	}
	/**
	 * @return the companyName
	 */
	public String getCompanyName() {
		return companyName;
	}
	/**
	 * @param companyName the companyName to set
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
}
