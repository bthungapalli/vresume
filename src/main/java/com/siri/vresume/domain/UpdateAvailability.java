package com.siri.vresume.domain;

public class UpdateAvailability {
	private String status;
	private int avlId;
	private int jobId;
	private int rId;
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getAvlId() {
		return avlId;
	}
	public void setAvlId(int avlId) {
		this.avlId = avlId;
	}
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public int getrId() {
		return rId;
	}
	public void setrId(int rId) {
		this.rId = rId;
	}
	
}
