package com.siri.vresume.domain;

public class TechComment {

	private int id;
	private int userId;
	private int submissionId;
	private String comment;
	private int techSubmissionId;
	private String userName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getSubmissionId() {
		return submissionId;
	}
	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getTechSubmissionId() {
		return techSubmissionId;
	}
	public void setTechSubmissionId(int techSubmissionId) {
		this.techSubmissionId = techSubmissionId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
}
