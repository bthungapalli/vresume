package com.siri.vresume.domain;

import java.util.ArrayList;
import java.util.List;

public class BulkJobs {

	private int rowNumber;
	private	List<String> errors = new ArrayList<>();
	public int getRowNumber() {
		return rowNumber;
	}
	public void setRowNumber(int rowNumber) {
		this.rowNumber = rowNumber;
	}
	public List<String> getErrors() {
		return errors;
	}
	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
	
	
}
