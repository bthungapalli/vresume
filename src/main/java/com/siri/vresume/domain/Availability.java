/**
 * 
 */
package com.siri.vresume.domain;


import org.springframework.data.annotation.Id;

/**
 * @author bthungapalli
 *
 */
public class Availability {
	
	@Id
	private int id;
	private String date;
	private String fromTime;
	private String toTime;
	private int submissionId;
	
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
	 * @return the date
	 */
	public String getDate() {
		return date;
	}
	/**
	 * @param date the date to set
	 */
	public void setDate(String date) {
		this.date = date;
	}
	/**
	 * @return the from
	 */
	public String getFrom() {
		return fromTime;
	}
	/**
	 * @param from the from to set
	 */
	public void setFrom(String from) {
		this.fromTime = from;
	}
	/**
	 * @return the to
	 */
	public String getTo() {
		return toTime;
	}
	/**
	 * @param to the to to set
	 */
	public void setTo(String to) {
		this.toTime = to;
	}
	/**
	 * @return the submissionId
	 */
	public int getSubmissionId() {
		return submissionId;
	}
	/**
	 * @param submissionId the submissionId to set
	 */
	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}
	

}
