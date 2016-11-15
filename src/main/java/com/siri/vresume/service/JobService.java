/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
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

	public List<Job> fetchJobs(int id) throws VResumeDaoException {
		List<Job> jobs = jobDao.fetchJobs(id);
		for (Job job : jobs) {
			job.setSubmissionCount(submissionDao.fetchSubmissionCount(job.getId()).size());
		}
		return jobs;
	}

	public List<UserDetails> getHiringMgr() {
		return jobDao.fetchHiringMgr();
	}

	public List<Job> fetchJobsByStatus(String status, int userId) throws VResumeDaoException {
		List<Job> jobs = jobDao.fetchJobsByStatus(status, userId);
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		int role = securityUser.getRole();
		int loggedInUserId = securityUser.getId();
		int jobId;
		List<Submission> submissions;
		for (Job job : jobs) {
			jobId = job.getId();
			submissions = submissionDao.fetchSubmissionCount(jobId);
			job.setSubmissionCount(submissions.size());
			if (job.getStatus().equalsIgnoreCase(VResumeConstants.ACTIVE_STATUS)) {
				verifyJobSubmission(submissions, loggedInUserId, job, role);
			}
		}
		return jobs;
	}

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
		jobDao.updateJob(job);
	}

	public Job fetchJobByJobId(int jobId) throws VResumeDaoException {
		Job job = jobDao.fetchJobByJobId(jobId);
		job.setSubmissionCount(submissionDao.fetchSubmissionCount(job.getId()).size());
		return job;
	}

	public void delteJob(int jobId) throws VResumeDaoException {
		jobDao.deleteJob(jobId);
	}

}
