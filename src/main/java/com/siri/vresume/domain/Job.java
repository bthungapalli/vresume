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
	private String payrateType;
	private String currency;
	private int minimumExperience;
	private int maximumExperience;
	private String duration;
	private Date startDate;
	private int createdById;
	private Date endDate;
	private int submissionCount;
	
	private boolean applied;
	private String companyName;
	
	private boolean isNew;
	private int newCount;
	private boolean showCompensation;
	
	private int hmNewCount;
	private boolean hmNew;
	
	private boolean preferredCheck;
	private boolean diverseCheck;
	private String department;
	private int quota;
	private int diverse;
	private int others;
	private String diverseType;
	
	
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
	
	public String getPayrateType() {
		return payrateType;
	}
	public void setPayrateType(String payrateType) {
		this.payrateType = payrateType;
	}

	
	
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	public int getMinimumExperience() {
		return minimumExperience;
	}
	public void setMinimumExperience(int minimumExperience) {
		this.minimumExperience = minimumExperience;
	}
	public int getMaximumExperience() {
		return maximumExperience;
	}
	public void setMaximumExperience(int maximumExperience) {
		this.maximumExperience = maximumExperience;
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
	/**
	 * @return the isNew
	 */
	public boolean isNew() {
		return isNew;
	}
	/**
	 * @param isNew the isNew to set
	 */
	public void setNew(boolean isNew) {
		if(getNewCount() > 0 ){
			this.isNew = true;
		}
	}
	/**
	 * @return the newCount
	 */
	public int getNewCount() {
		return newCount;
	}
	/**
	 * @param newCount the newCount to set
	 */
	public void setNewCount(int newCount) {
		this.newCount = newCount;
	}
	/**
	 * @return the showCompensation
	 */
	public boolean isShowCompensation() {
		return showCompensation;
	}
	/**
	 * @param showCompensation the showCompensation to set
	 */
	public void setShowCompensation(boolean showCompensation) {
		this.showCompensation = showCompensation;
	}
	/**
	 * @return the hmNewCount
	 */
	public int getHmNewCount() {
		return hmNewCount;
	}
	/**
	 * @param hmNewCount the hmNewCount to set
	 */
	public void setHmNewCount(int hmNewCount) {
		this.hmNewCount = hmNewCount;
	}
	/**
	 * @return the hmNew
	 */
	public boolean isHmNew() {
		return hmNew;
	}
	/**
	 * @param hmNew the hmNew to set
	 */
	public void setHmNew(boolean hmNew) {
		if(getHmNewCount() > 0 ){
			this.hmNew = true;
		}
	}
	public boolean isPreferredCheck() {
		return preferredCheck;
	}
	public void setPreferredCheck(boolean preferredCheck) {
		this.preferredCheck = preferredCheck;
	}
	
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public int getQuota() {
		return quota;
	}
	public void setQuota(int quota) {
		this.quota = quota;
	}
	
	public int getOthers() {
		return others;
	}
	public void setOthers(int others) {
		this.others = others;
	}
	public boolean isDiverseCheck() {
		return diverseCheck;
	}
	public void setDiverseCheck(boolean diverseCheck) {
		this.diverseCheck = diverseCheck;
	}
	public int getDiverse() {
		return diverse;
	}
	public void setDiverse(int diverse) {
		this.diverse = diverse;
	}
	public String getDiverseType() {
		return diverseType;
	}
	public void setDiverseType(String diverseType) {
		this.diverseType = diverseType;
	}
	
	
}
