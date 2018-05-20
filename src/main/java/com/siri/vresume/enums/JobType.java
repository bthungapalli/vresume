package com.siri.vresume.enums;

public enum JobType {

	Hourly("Hourly"), Weekly("Weekly"), Monthly("Monthly"), Annually("Annually");

	private String jobType;

	JobType(String jobType) {
		this.jobType = jobType;
	}

	public String getJobType() {
		return this.jobType;
	}
}
