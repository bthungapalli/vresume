/**
 * 
 */
package com.siri.vresume.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.dao.JobDao;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.domain.BulkJobs;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.Templates;
import com.siri.vresume.domain.UpdateAvailability;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.enums.Currency;
import com.siri.vresume.enums.DiverseType;
import com.siri.vresume.enums.JobType;
import com.siri.vresume.enums.PositionType;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.utils.JobValidationUtil;
import com.siri.vresume.utils.SubmissionStatusEnum;
/**
 * @author bthungapalli
 *
 */
@Service
public class JobService {

	@Autowired
	private JobDao jobDao;

	@Autowired
	private SubmissionDao submissionDao;
	
	@Autowired
	private TemplateService templateService;
	
	@Autowired
	private JobValidationUtil JobValidationUtil;
	
	private static final String EMPTY_STRING="";
	private static final int ZERO=0;
	
	private static final Logger logger = Logger.getLogger(JobService.class);
	
	public List<Job> fetchJobs(int id,SecurityUser securityUser) throws VResumeDaoException {
		List<Job> jobs = jobDao.fetchJobs(id);
		for (Job job : jobs) {
			job.setSubmissionCount(submissionDao.fetchSubmissionCount(job.getId(), securityUser.getRole()).size());
		}
		return jobs;
	}

	public List<UserDetails> getHiringMgr(int userId) {
		return jobDao.fetchHiringMgr(userId);
	}

	public List<Job> fetchJobsByStatus(String status, SecurityUser user) throws VResumeDaoException {
		int userRole = user.getRole();
		List<Job> jobs = jobDao.fetchJobsByStatus(status, user.getRole(),user.getId());
			for(Job job : jobs){
				if(userRole==2){
					job.setNewCount(job.getHmNewCount());
				}
			}
		return jobs;
	}

	/*
	 * Will Remove once the Logic was not stable.
	 * 
	 * public List<Job> fetchJobsByStatusDuplicate(String status, int userId)
	 * throws VResumeDaoException { System.out.println("Came to dups");
	 * List<Job> jobs = jobDao.fetchJobsByStatus(status, userId); SecurityUser
	 * securityUser = (SecurityUser)
	 * SecurityContextHolder.getContext().getAuthentication() .getPrincipal();
	 * int role = securityUser.getRole(); int loggedInUserId =
	 * securityUser.getId(); List<Submission> submissions; submissions =
	 * submissionDao.fetchSubmissionCountForjobs(role, jobs); for (Job job :
	 * jobs) { int count = 0; int counter = 0; for (Submission submission :
	 * submissions) { count += 1; job.setSubmissionCount(count); if
	 * (job.getStatus().equalsIgnoreCase(VResumeConstants.ACTIVE_STATUS)) { if
	 * (loggedInUserId == submission.getUserId()) { job.setApplied(true); } if
	 * ((role == 1 &&
	 * submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString
	 * ()) || (role == 2 && submission.getStatus()
	 * .equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())))) {
	 * job.setNew(true); counter++; }
	 * 
	 * job.setNewCount(counter); } }
	 * 
	 * } return jobs; }
	 */

	private void verifyJobSubmission(List<Submission> submissions, int userId, Job job, int role)
			throws VResumeDaoException {
		int counter = 0;
		for (Submission submission : submissions) {
			if (userId == submission.getUserId()) {
				job.setApplied(true);
			}
			if ((role == 1 && submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString()) || (role == 2
					&& submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())))) {
				job.setNew(true);
				counter++;
			}

		}
		job.setNewCount(counter);
	}

	public void postJob(Job job) throws VResumeDaoException {
		if (job.getHiringUserId() <= 0)
			job.setHiringUserId(job.getCreatedById());
		jobDao.postJob(job);

	}

	public void updateJob(Job job) throws VResumeDaoException {
		if (job.getHiringUserId() <= 0)
			job.setHiringUserId(job.getCreatedById());
		try{
		   jobDao.updateJob(job);
		   }catch(Exception e){
			e.printStackTrace();
		   }
	}

	public Job fetchJobByJobId(int jobId, SecurityUser securityUser) throws VResumeDaoException {
		Job job = jobDao.fetchJobByJobId(jobId);
		job.setSubmissionCount(submissionDao.fetchSubmissionCount(job.getId(), securityUser.getRole()).size());
		return job;
	}

	public void delteJob(int jobId) throws VResumeDaoException {
		jobDao.deleteJob(jobId);
	}

	public Boolean fetchAppliedStatusForUser(int jobId, int userId) throws VResumeDaoException {
		try{
		return jobDao.fetchAppliedStatusForUser(jobId,userId) > 0;
		}
		catch(Exception ex){
			throw new VResumeDaoException(ex.getMessage());
		}
		}

	public List<BulkJobs> uploadBulkJobs(SecurityUser securityUser, MultipartFile jobs) throws VResumeDaoException {
		logger.info("inside service");
		  List<Job> bulkJobs= new ArrayList<>();
          List<BulkJobs> bulkJobValidations= new ArrayList<>();
		 try {
	            Workbook workbook = new XSSFWorkbook(jobs.getInputStream());
	            Sheet datatypeSheet = workbook.getSheetAt(0);
	            Iterator<Row> iterator = datatypeSheet.iterator();
	            while (iterator.hasNext()) {
				Row currentRow = iterator.next();
				logger.info("currentRow"+currentRow.getRowNum());
				if (currentRow.getRowNum()!= 0) {
					Job job= new Job();
					BulkJobs bulkJobValidation= new BulkJobs();
					bulkJobValidation.setRowNumber(currentRow.getRowNum());
					try{
					job.setTitle(JobValidationUtil.validate(currentRow.getCell(0), "TITLE", bulkJobValidation)? JobValidationUtil.getString(currentRow.getCell(0),"TITLE", bulkJobValidation):EMPTY_STRING);
					job.setTemplateId(JobValidationUtil.validate(currentRow.getCell(1), "TEMPLATE", bulkJobValidation)?fetchTemplateId(securityUser,JobValidationUtil.getString(currentRow.getCell(1),"TEMPLATE", bulkJobValidation),bulkJobValidation):0);
					job.setLocation(JobValidationUtil.validate(currentRow.getCell(2), "LOCATION", bulkJobValidation)?  JobValidationUtil.getString(currentRow.getCell(2),"LOCATION", bulkJobValidation): EMPTY_STRING );
					job.setJobType(JobValidationUtil.validate(currentRow.getCell(3), "POSITION TYPE", bulkJobValidation)? fetchPositionType(JobValidationUtil.getString(currentRow.getCell(3),"POSITION TYPE", bulkJobValidation),bulkJobValidation) : ZERO);
					job.setStartDate(JobValidationUtil.validate(currentRow.getCell(4), "START DATE", bulkJobValidation)? fetchStartDate(currentRow.getCell(4),bulkJobValidation): null);
					job.setDuration(JobValidationUtil.validate(currentRow.getCell(5), "DURATION", bulkJobValidation)?  JobValidationUtil.getString(currentRow.getCell(5),"DURATION", bulkJobValidation): EMPTY_STRING);
					job.setDescription(JobValidationUtil.validate(currentRow.getCell(6), "DESCRIPTION", bulkJobValidation)? JobValidationUtil.getString( currentRow.getCell(6),"DESCRIPTION", bulkJobValidation): EMPTY_STRING);
					job.setSkills(JobValidationUtil.validate(currentRow.getCell(7), "SKILLS", bulkJobValidation)?  JobValidationUtil.getString( currentRow.getCell(7),"SKILLS", bulkJobValidation): EMPTY_STRING);
					job.setCompensation(JobValidationUtil.validate(currentRow.getCell(8), "COMPENSATION", bulkJobValidation)?  JobValidationUtil.getString( currentRow.getCell(8),"COMPENSATION", bulkJobValidation): EMPTY_STRING);
					job.setPayrateType(JobValidationUtil.validate(currentRow.getCell(9), "PAY RATE TYPE", bulkJobValidation)?  fetchJobType(JobValidationUtil.getString( currentRow.getCell(9),"PAY RATE TYPE", bulkJobValidation),bulkJobValidation): EMPTY_STRING);
					job.setCurrency(JobValidationUtil.validate(currentRow.getCell(10), "CURRENCY", bulkJobValidation)?  fetchCurrency(JobValidationUtil.getString( currentRow.getCell(10),"CURRENCY", bulkJobValidation),bulkJobValidation): EMPTY_STRING);
					job.setMinimumExperience(JobValidationUtil.validate(currentRow.getCell(11), "MIN EXPERIENCE", bulkJobValidation)?  JobValidationUtil.getNumber(  currentRow.getCell(11),"MIN EXPERIENCE", bulkJobValidation).intValue():ZERO);
					job.setMaximumExperience(JobValidationUtil.validate(currentRow.getCell(12), "MAX EXPERIENCE", bulkJobValidation)?   JobValidationUtil.getNumber( currentRow.getCell(12),"MAX EXPERIENCE", bulkJobValidation).intValue():ZERO);
					job.setDiverseType(JobValidationUtil.validate(currentRow.getCell(13), "DIVERSE TYPE", bulkJobValidation)?  fetchDiverseType(JobValidationUtil.getString( currentRow.getCell(13),"DIVERSE TYPE", bulkJobValidation),bulkJobValidation): EMPTY_STRING);
					job.setPreferredCheck(JobValidationUtil.validate(currentRow.getCell(14), "PREFERRED", bulkJobValidation)? true:false);
					job.setDiverseCheck(JobValidationUtil.validate(currentRow.getCell(15), "DIVERSE ONLY", bulkJobValidation)? true:false);
					job.setDepartment(JobValidationUtil.validate(currentRow.getCell(16), "DEPARTMENT", bulkJobValidation)? JobValidationUtil.getString(currentRow.getCell(16),"DEPARTMENT", bulkJobValidation): EMPTY_STRING);
					job.setQuota(JobValidationUtil.validate(currentRow.getCell(17), "QUOTA", bulkJobValidation)?  JobValidationUtil.getNumber(currentRow.getCell(17),"QUOTA", bulkJobValidation).intValue():ZERO);
					job.setOthers(JobValidationUtil.validate(currentRow.getCell(18), "OTHERS", bulkJobValidation)?  JobValidationUtil.getNumber(currentRow.getCell(18),"OTHERS", bulkJobValidation).intValue():ZERO);
					job.setDiverse(JobValidationUtil.validate(currentRow.getCell(19), "DIVERSE", bulkJobValidation)?  JobValidationUtil.getNumber(currentRow.getCell(19),"DIVERSE", bulkJobValidation).intValue():ZERO);
					job.setStatus(VResumeConstants.ACTIVE_STATUS);
					JobValidationUtil.jobValidation(job,bulkJobValidation);
					
					if(bulkJobValidation.getErrors().size()==0){
						bulkJobs.add(job);
					}else{
						bulkJobValidations.add(bulkJobValidation);
					}
					
					}catch(Exception e){
						bulkJobValidations.add(bulkJobValidation);
					}
					
				}     
	           }
	        } catch (FileNotFoundException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		 
		 if(bulkJobs.size()>0){
			 for(Job job: bulkJobs){
				 job.setCreatedById(securityUser.getId());
				 job.setHiringUserId(securityUser.getId());
				 jobDao.postJob(job);
			 }
		 }
		 logger.info("moving out");
		 return bulkJobValidations;
		 
	}

	private String fetchDiverseType(String types, BulkJobs bulkJobValidation) {
		String returnValue=EMPTY_STRING;
		if(StringUtils.isNotBlank(types)){
		String[] temp=types.split(",");
		for(String t: temp){
			try{
				DiverseType diverseType=DiverseType.valueOf(t);
				returnValue=returnValue+diverseType.getDiverseType()+",";
			}catch(Exception e){
				bulkJobValidation.getErrors().add("Diverse Type should be Women or Veterian or Hispanic or LGBT");
				return EMPTY_STRING;
			}
		}
		returnValue=returnValue.length()>0?returnValue.substring(0, returnValue.length()-1):returnValue;
		}
		
		return returnValue;
	}

	private int fetchPositionType(String positionType, BulkJobs bulkJobValidation) {
		try{
			PositionType selected=PositionType.valueOf(positionType);
			return selected.getPositionType();
			}catch(Exception e){
				bulkJobValidation.getErrors().add("Position Type should be Contract or Permanent");
				return ZERO;
			}
	}

	private String fetchCurrency(String currency, BulkJobs bulkJobValidation) {
		try{
			Currency selected=Currency.valueOf(currency);
			return selected.getCurrency();
			}catch(Exception e){
				bulkJobValidation.getErrors().add("Currency should be Euro or Dollar or Pound");
				return EMPTY_STRING;
			}
	}

	private Date fetchStartDate(Cell cell, BulkJobs bulkJobValidation) {
		try{
			if (HSSFDateUtil.isCellDateFormatted(cell)) {
	        	java.util.Date date=	cell.getDateCellValue();
	        	return new Date(date.getTime());
	    }else{
	    	bulkJobValidation.getErrors().add("Start Date format is yyyy-MM-dd");
	    }
		}catch(Exception e){
			bulkJobValidation.getErrors().add("Start Date format is yyyy-MM-dd");
		}
		return null;
	}

	private String fetchJobType(String stringCellValue, BulkJobs bulkJobValidation) {
		try{
		JobType jobType=JobType.valueOf(stringCellValue);
		return jobType.getJobType();
		}catch(Exception e){
			bulkJobValidation.getErrors().add("Job Type should be Hourly or Weekly or Monthly or Annually");
			return EMPTY_STRING;
		}
	}

	private int fetchTemplateId(SecurityUser securityUser, String templateName, BulkJobs bulkJobValidation) throws VResumeDaoException {
		List<Templates> templates=templateService.fetchTemplates(securityUser.getId());
		   for(Templates template:templates){
			   if(template.getTemplateName().equalsIgnoreCase(templateName)){
				   return template.getTemplateId();
			   }
		   }
		   bulkJobValidation.getErrors().add("Template does not exist, please create");
		return 0;
	}

	public Job viewJobByJobId(int jobId) throws VResumeDaoException {
		return jobDao.viewJobByJobId(jobId);
	}

	public void updateAvailability(UpdateAvailability updateAvailability)  throws VResumeDaoException  {
		submissionDao.updateUserAvailabilities("Accept".equalsIgnoreCase(updateAvailability.getStatus())?1:0,updateAvailability.getAvlId());
	}

	public List<Job> fetchTechJobs(SecurityUser securityUser) throws VResumeDaoException{
		List<Job>  jobs = jobDao.fetchTechJobs(securityUser.getId());
		Map<Integer,Job> jobMaps = new LinkedHashMap<>();
		for(Job job:jobs){
			if(jobMaps.get(job.getId())==null){
				job.setSubmissionCount(1);
				int newCount = submissionDao.getNewCount(job.getId(),securityUser.getId());
				job.setNewCount(newCount);
				jobMaps.put(job.getId(), job);
			}else{
				int newCount = jobMaps.get(job.getId()).getSubmissionCount()+1;
				jobMaps.get(job.getId()).setSubmissionCount(newCount);
			}
		}
		return new ArrayList<Job>(jobMaps.values());
	}

}
