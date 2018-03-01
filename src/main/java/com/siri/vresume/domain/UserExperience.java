package com.siri.vresume.domain;

import java.sql.Date;

//import java.util.Date;

public class UserExperience {
	
	private int Id;
	private String employer;
	private String jobTitle;
	private Date joiningDate;
	private Date releavingDate;
	private int userId;
	public String getEmployer() {
		return employer;
	}
	public void setEmployer(String employer) {
		this.employer = employer;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public Date getJoiningDate() {
		return joiningDate;
	}
	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}
	public Date getReleavingDate() {
		return releavingDate;
	}
	public void setReleavingDate(Date releavingDate) {
		this.releavingDate = releavingDate;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getId() {
		return Id;
	}
	public void setId(int Id) {
		this.Id = Id;
	}
		

	
}
