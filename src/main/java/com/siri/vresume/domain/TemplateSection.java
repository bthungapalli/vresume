package com.siri.vresume.domain;

import org.springframework.data.annotation.Id;

public class TemplateSection extends DateTimeVars {
	
	@Id
	private int sectionId;
	private int templateId;
	private String sectionName;
	private String durations;
	private int priority;
	private int updateUserId;
	
	public int getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(int updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getDurations() {
		return durations;
	}
	public void setDurations(String durations) {
		this.durations = durations;
	}
	public int getSectionId() {
		return sectionId;
	}
	public void setSectionId(int sectionId) {
		this.sectionId = sectionId;
	}
	public int getTemplateId() {
		return templateId;
	}
	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}
	
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	

}
