/**
 * 
 */
package com.siri.vresume.domain;



import java.util.List;

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
}
