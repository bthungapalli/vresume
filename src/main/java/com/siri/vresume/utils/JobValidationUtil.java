package com.siri.vresume.utils;

import java.sql.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.springframework.stereotype.Component;

import com.siri.vresume.domain.BulkJobs;
import com.siri.vresume.domain.Job;

@Component
public class JobValidationUtil {

	public boolean validate(Cell currentCell, String name, BulkJobs bulkJobs) {
		if (currentCell==null || (currentCell.getCellTypeEnum() == CellType.STRING && StringUtils.isBlank(currentCell.getStringCellValue()))) {
			bulkJobs.getErrors().add(name + " Cant be empty");
			return false;
		} else if (currentCell==null || (currentCell.getCellTypeEnum() == CellType.NUMERIC && currentCell.getNumericCellValue()<0)) {
			bulkJobs.getErrors().add(name + " Cant be Negative");
			return false;
		}
		return true;
	}
	
	public String getString(Cell currentCell, String name, BulkJobs bulkJobs) {
		if (currentCell!=null && (currentCell.getCellTypeEnum() == CellType.NUMERIC )) {
			return new Double(currentCell.getNumericCellValue()).toString();
		}else if(currentCell!=null && (currentCell.getCellTypeEnum() == CellType.STRING )){
			return currentCell.getStringCellValue();
		}else{
			return "";
		}
	}
	
	public java.util.Date getDate(Cell currentCell, String name, BulkJobs bulkJobs) {
		 if (HSSFDateUtil.isCellDateFormatted(currentCell)) {
		        	return	currentCell.getDateCellValue();
		    }
		return null;
	}
	
	public Double getNumber(Cell currentCell, String name, BulkJobs bulkJobs) {
		if (currentCell!=null && (currentCell.getCellTypeEnum() == CellType.NUMERIC) ) {
			return currentCell.getNumericCellValue();
		}
		return 0.0;
	}

	public void jobValidation(Job job, BulkJobs bulkJobValidation) {
		
		if(job.getMaximumExperience()<job.getMinimumExperience()){
			bulkJobValidation.getErrors().add("Min Experience should be greater than Max Experience");
		}
		
		if(job.getOthers()+job.getDiverse()!=100){
			bulkJobValidation.getErrors().add("Sum of Others and Diverse should be 100");
		}
		Date today= new Date(new java.util.Date().getTime());
		if(job.getStartDate()==null || ( job.getStartDate()!= null && job.getStartDate().before(today))){
			bulkJobValidation.getErrors().add("Start Date cant be in past");
		}		
	}
	
	
	

}
