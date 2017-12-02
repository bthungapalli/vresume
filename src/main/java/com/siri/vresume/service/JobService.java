/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.controller.JobController;
import com.siri.vresume.dao.JobDao;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.exception.VResumeDaoException;
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
	private SubmissionDao SubmissionDao;

	@Autowired
	private SubmissionDao submissionDao;
	
	private static final Logger logger = Logger.getLogger(JobService.class);
	
	public List<Job> fetchJobs(int id) throws VResumeDaoException {
		List<Job> jobs = jobDao.fetchJobs(id);
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		for (Job job : jobs) {
			job.setSubmissionCount(submissionDao.fetchSubmissionCount(job.getId(), securityUser.getRole()).size());
		}
		return jobs;
	}

	public List<UserDetails> getHiringMgr() {
		return jobDao.fetchHiringMgr();
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

	public Job fetchJobByJobId(int jobId) throws VResumeDaoException {
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
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

}
