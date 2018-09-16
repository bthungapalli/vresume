package com.siri.vresume.domain;

import java.util.List;

public class SaveTechSubmissions {

	private int submissionId;
	private int jobId;
	private List<Integer> techUserIds;
	
	public List<Integer> getTechUserIds() {
		return techUserIds;
	}
	public void setTechUserIds(List<Integer> techUserIds) {
		this.techUserIds = techUserIds;
	}
	public int getSubmissionId() {
		return submissionId;
	}
	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	
	
}
