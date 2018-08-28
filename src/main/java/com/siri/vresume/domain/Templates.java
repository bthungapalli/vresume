/**
 * 
 */
package com.siri.vresume.domain;



import org.springframework.data.annotation.Id;

/**
 * @author bthungapalli
 *
 */
public class Templates extends DateTimeVars {

	@Id
	private int templateId;
	private int userId;
	private String templateName;
	private String sections;
	private String durations;
	private String internalSections;
	private String orders;
	
	
	public String getInternalSections() {
		return internalSections;
	}
	public void setInternalSections(String internalSections) {
		this.internalSections = internalSections;
	}
	public String getOrders() {
		return orders;
	}
	public void setOrders(String orders) {
		this.orders = orders;
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
	 * @return the templateName
	 */
	public String getTemplateName() {
		return templateName;
	}
	/**
	 * @param templateName the templateName to set
	 */
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	/**
	 * @return the sections
	 */
	public String getSections() {
		return sections;
	}
	/**
	 * @param sections the sections to set
	 */
	public void setSections(String sections) {
		this.sections = sections;
	}
	/**
	 * @return the durations
	 */
	public String getDurations() {
		return durations;
	}
	/**
	 * @param durations the durations to set
	 */
	public void setDurations(String durations) {
		this.durations = durations;
	}
}
