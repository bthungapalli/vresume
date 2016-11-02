package com.siri.vresume.domain;

import java.io.Serializable;

public class StatusCounts implements Serializable {

	private static final long serialVersionUID = 5014323128335155848L;
	
	private String status;
	private int count;
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
	 * @return the count
	 */
	public int getCount() {
		return count;
	}
	/**
	 * @param count the count to set
	 */
	public void setCount(int count) {
		this.count = count;
	}
}
